import {
  parseHexToBuffer,
  decryptWithAesData,
  createDecryptionData,
} from '../tools'

export const decryptConfig = async (
  buffer: ArrayBuffer,
  encryptedHex: string | null
) => {
  if (!encryptedHex) {
    return null
  }

  const encryptedBuffer = parseHexToBuffer(encryptedHex)

  const { iv, key } = await createDecryptionData(buffer)

  try {
    return await decryptWithAesData(encryptedBuffer, iv, key)
  } catch (e) {
    return null
  }
}
