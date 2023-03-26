import { getCompressedConfigText } from '@/entities/services-config'
import { getMasterTool } from '@/entities/master-tool'
import { getBufferOfText, encrypt } from '@/shared'

export const getEncryptedConfig = () => {
  const { key, iv } = getMasterTool()
  const compressedConfigText = getCompressedConfigText()
  const compressedConfigBuffer = getBufferOfText(compressedConfigText)

  return encrypt(compressedConfigBuffer, key, iv)
}
