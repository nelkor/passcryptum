import { ref } from 'vue'

import { createEmptyConfig } from '../lib/create-empty-config'
import type { ServicesConfig } from '../types'

const servicesConfig = ref<ServicesConfig | null>(null)

export const setEmptyServicesConfig = () => {
  servicesConfig.value = createEmptyConfig()
}

export const clearServicesConfig = () => {
  servicesConfig.value = null
}
