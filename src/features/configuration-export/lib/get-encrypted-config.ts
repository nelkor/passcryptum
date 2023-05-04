import { compressedConfigText } from '@/entities/services-config'
import { getMasterTool } from '@/entities/master-tool'
import { getBufferOfText, encrypt } from '@/shared'

export const getEncryptedConfig = () => {
  const { key, iv } = getMasterTool()
  const compressedConfigBuffer = getBufferOfText(compressedConfigText.value)

  return encrypt(compressedConfigBuffer, key, iv)
}
