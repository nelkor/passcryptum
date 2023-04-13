import {
  getBufferOfText,
  reverseText,
  sha512,
  stringifyBuffer,
  createCryptoKey,
} from '@/shared'

import type { MasterTool } from '../types'

export const createMasterTool = async (
  password: string
): Promise<MasterTool> => {
  const buffer = getBufferOfText(reverseText(password))

  const hash = await sha512(buffer)

  // hex string from 16-byte buffer
  const shortHash = stringifyBuffer(hash.slice(0, 16))

  // 32-byte buffer
  const keyData = hash.slice(16, 48)

  // 16-byte buffer
  const iv = hash.slice(48)

  const key = await createCryptoKey(keyData)

  return {
    shortHash,
    key,
    iv,
  }
}
