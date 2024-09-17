export const pbkdf2 = async (
  buffer: ArrayBuffer,
  bytesLength: number,
  iterations: number,
) => {
  const [key, salt] = await Promise.all([
    crypto.subtle.importKey('raw', buffer, 'PBKDF2', false, ['deriveBits']),
    crypto.subtle.digest('SHA-256', buffer),
  ])

  return crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      hash: 'SHA-512',
      salt,
      iterations,
    },
    key,
    bytesLength * 8,
  )
}

export const createAesKey = (buffer: ArrayBuffer) =>
  crypto.subtle.importKey('raw', buffer, 'AES-CBC', false, [
    'encrypt',
    'decrypt',
  ])

export const decrypt = (iv: ArrayBuffer, key: CryptoKey, data: ArrayBuffer) =>
  crypto.subtle.decrypt({ name: 'AES-CBC', iv }, key, data)

export const encrypt = (iv: ArrayBuffer, key: CryptoKey, data: ArrayBuffer) =>
  crypto.subtle.encrypt({ name: 'AES-CBC', iv }, key, data)
