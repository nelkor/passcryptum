import { decrypt, parseHexToBuffer, getTextFromBuffer } from '@/shared'

import { getMasterTool } from '../model/master-tool'

export const decryptHex = async (text: string) => {
  const { key, iv } = getMasterTool()

  try {
    const buffer = parseHexToBuffer(text)

    const decrypted = await decrypt(buffer, key, iv)

    return getTextFromBuffer(decrypted)
  } catch (e) {
    return ''
  }
}
