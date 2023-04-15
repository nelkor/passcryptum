import {
  compressedConfigText,
  setServicesConfig,
} from '@/entities/services-config'
import { getMasterTool } from '@/entities/master-tool'
import type { ServicesConfig } from '@/entities/services-config'
import { stringifyBuffer, getBufferOfText, encrypt } from '@/shared'

export const setConfiguration = async (servicesConfig: ServicesConfig) => {
  setServicesConfig(servicesConfig)

  const { shortHash, key, iv } = getMasterTool()
  const compressedConfigBuffer = getBufferOfText(compressedConfigText.value)

  const encryptedConfigBuffer = await encrypt(compressedConfigBuffer, key, iv)

  localStorage.setItem(shortHash, stringifyBuffer(encryptedConfigBuffer))
}
