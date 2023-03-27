import { ref, computed } from 'vue'

import { createEmptyConfig, createService } from '../lib/creation-tools'
import { compressConfig } from '../lib/compress-config'
import { decompressConfig } from '../lib/decompress-config'
import type { ServicesConfig } from '../types'

const servicesConfig = ref<ServicesConfig>(createEmptyConfig())

export const compressedConfigText = computed(() =>
  JSON.stringify(compressConfig(servicesConfig.value))
)

const savedConfig = ref(compressedConfigText.value)

export const isConfigSaved = computed(
  () => savedConfig.value === compressedConfigText.value
)

export const customServices = computed(() => servicesConfig.value.custom)

export const getCustomServiceByName = (name: string) =>
  servicesConfig.value.custom.find(service => service.name === name)

export const addCustomService = (name: string) => {
  if (getCustomServiceByName(name)) {
    throw new Error('Trying to create new custom service with an existing name')
  }

  servicesConfig.value.custom.push(createService(name))
}

export const isConfigEmpty = computed(() => {
  const { popular, custom } = servicesConfig.value

  return popular.length === 0 && custom.length === 0
})

export const setServicesConfig = (config: ServicesConfig) => {
  servicesConfig.value = config
  savedConfig.value = compressedConfigText.value
}

export const saveConfig = () => {
  savedConfig.value = compressedConfigText.value
}

export const cancelChanges = () => {
  servicesConfig.value = decompressConfig(JSON.parse(savedConfig.value))
}

export const clearServicesConfig = () => {
  setServicesConfig(createEmptyConfig())
}
