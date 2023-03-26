import { ref, computed } from 'vue'

import { createEmptyConfig } from '../lib/create-empty-config'
import { compressConfig } from '../lib/compress-config'
import type { ServicesConfig } from '../types'

const servicesConfig = ref<ServicesConfig>(createEmptyConfig())

export const getCompressedConfigText = () =>
  JSON.stringify(compressConfig(servicesConfig.value))

export const isConfigEmpty = computed(() => {
  const { popular, custom } = servicesConfig.value

  return popular.length === 0 && custom.length === 0
})

export const setServicesConfig = (config: ServicesConfig) => {
  servicesConfig.value = config
}

export const clearServicesConfig = () => {
  servicesConfig.value = createEmptyConfig()
}
