const testIv = (iv: ArrayBuffer) => {
  if (iv.byteLength !== 16) {
    throw new Error('Initialization vector must be 16 bytes long')
  }
}

const createAesFunction =
  (methodName: 'encrypt' | 'decrypt') =>
  (
    data: ArrayBuffer,
    key: CryptoKey,
    iv: ArrayBuffer
  ): Promise<ArrayBuffer> => {
    testIv(iv)

    return crypto.subtle[methodName]({ name: 'AES-CBC', iv }, key, data)
  }

export const createCryptoKey = (keyData: ArrayBuffer) =>
  crypto.subtle.importKey('raw', keyData, 'AES-CBC', false, [
    'encrypt',
    'decrypt',
  ])

export const encrypt = createAesFunction('encrypt')

export const decrypt = createAesFunction('decrypt')
