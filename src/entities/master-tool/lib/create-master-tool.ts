import {
  getBufferOfText,
  reverseText,
  sha512,
  bufferToHexString,
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
  const hash = bufferToHexString(mainHash)

  // hex string from 16-byte buffer
  const shortHash = bufferToHexString(extraBytes.slice(0, 16))

  // 32-byte buffer
  const keyData = extraBytes.slice(16, 48)

  // 16-byte buffer
  const iv = extraBytes.slice(48)

  const key = await crypto.subtle.importKey('raw', keyData, 'AES-CBC', false, [
    'encrypt',
    'decrypt',
  ])

  return {
    hash,
    shortHash,
    key,
    iv,
  }
}
