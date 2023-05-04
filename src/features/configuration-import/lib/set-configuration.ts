import {
  servicesConfig,
  compressedConfigText,
  setServicesConfig,
} from '@/entities/services-config'
import type { ServicesConfig } from '@/entities/services-config'
import { getMasterTool } from '@/entities/master-tool'
import { stringifyBuffer, getBufferOfText, encrypt } from '@/shared'

import { mergeConfigurations } from './merge-configurations'

export const setConfiguration = async (config: ServicesConfig) => {
  setServicesConfig(mergeConfigurations(servicesConfig.value, config))

  const { shortHash, key, iv } = getMasterTool()
  const compressedConfigBuffer = getBufferOfText(compressedConfigText.value)

  const encryptedConfigBuffer = await encrypt(compressedConfigBuffer, key, iv)

  localStorage.setItem(shortHash, stringifyBuffer(encryptedConfigBuffer))
}
