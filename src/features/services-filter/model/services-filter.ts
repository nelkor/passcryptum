import { ref, computed } from 'vue'

import { servicesConfig } from '@/entities/services-config'

export const nameSubstring = ref('')

export const clearNameSubstring = () => {
  nameSubstring.value = ''
}

export const filteredServices = computed(() =>
  servicesConfig.value.filter(({ name }) =>
    name.toLowerCase().includes(nameSubstring.value.toLowerCase())
  )
)
