type CryptoUsage = 'encrypt' | 'decrypt'

const createHashFn =
  (algorithm: AlgorithmIdentifier) => (buffer: ArrayBuffer) =>
    crypto.subtle.digest(algorithm, buffer)

const sha256 = createHashFn('SHA-256')

export const sha512 = createHashFn('SHA-512')

export const slowHash = async (
  buffer: ArrayBuffer,
  bytesLength: number,
  iterations: number
) => {
  const [key, salt] = await Promise.all([
    crypto.subtle.importKey('raw', buffer, 'PBKDF2', false, ['deriveBits']),
    sha256(buffer),
  ])

  return crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      hash: 'SHA-512',
      salt,
      iterations,
    },
    key,
    bytesLength * 8
  )
}

const makeCryptoDataCreator =
  (usage: CryptoUsage) => async (buffer: ArrayBuffer) => ({
    iv: buffer.slice(0, 16),
    key: await crypto.subtle.importKey(
      'raw',
      buffer.slice(16),
      'AES-CBC',
      false,
      [usage]
    ),
  })

const createAesDataFunction =
  (fn: CryptoUsage) => (source: ArrayBuffer, iv: ArrayBuffer, key: CryptoKey) =>
    crypto.subtle[fn]({ name: 'AES-CBC', iv }, key, source)

export const createEncryptionData = makeCryptoDataCreator('encrypt')

export const createDecryptionData = makeCryptoDataCreator('decrypt')

export const encryptWithAesData = createAesDataFunction('encrypt')

export const decryptWithAesData = createAesDataFunction('decrypt')

export const encrypt = async (source: ArrayBuffer, keyBuffer: ArrayBuffer) => {
  const { iv, key } = await createEncryptionData(keyBuffer)

  return encryptWithAesData(source, iv, key)
}

export const decrypt = async (source: ArrayBuffer, keyBuffer: ArrayBuffer) => {
  const { iv, key } = await createDecryptionData(keyBuffer)

  return decryptWithAesData(source, iv, key)
}
