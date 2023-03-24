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
  const buffer = getBufferOfText(password)
  const reverseBuffer = getBufferOfText(reverseText(password))

  const [mainHash, extraBytes] = await Promise.all([
    sha512(buffer),
    sha512(reverseBuffer),
  ])

  // hex string from 64-byte buffer
  const hash = stringifyBuffer(mainHash)

  // hex string from 16-byte buffer
  const shortHash = stringifyBuffer(extraBytes.slice(0, 16))

  // 32-byte buffer
  const keyData = extraBytes.slice(16, 48)

  // 16-byte buffer
  const iv = extraBytes.slice(48)

  const key = await createCryptoKey(keyData)

  return {
    hash,
    shortHash,
    key,
    iv,
  }
}
