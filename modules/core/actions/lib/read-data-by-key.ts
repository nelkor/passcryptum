import { parseHexToBuffer, getTextFromBuffer, decrypt } from '../../shared'

export const readDataByKey = async (
  data: string | ArrayBuffer,
  iv: ArrayBuffer,
  key: CryptoKey,
): Promise<string | null> => {
  try {
    const buffer = typeof data === 'string' ? parseHexToBuffer(data) : data

    return getTextFromBuffer(await decrypt(iv, key, buffer))
  } catch (e) {
    void e

    return null
  }
}
