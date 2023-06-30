import { ref, computed } from 'vue'

import { services } from '@/entities/session'

export const filterSubstring = ref('')

export const clearFilterSubstring = () => {
  filterSubstring.value = ''
}

export const filteredServices = computed(() =>
  services.value.filter(({ name }) =>
    name.toLowerCase().includes(filterSubstring.value.toLowerCase())
  )
)
