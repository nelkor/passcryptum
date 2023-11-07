import { ref, watch } from 'vue'

import { privateServices } from '../model/private'
import { selectedServiceName } from '../lib/services-options'

export const useServiceFilter = () => {
  const filterString = ref(selectedServiceName.value)

  watch(selectedServiceName, value => {
    filterString.value = value
  })

  watch(filterString, value => {
    if (privateServices.value.some(({ name }) => name === value)) {
      selectedServiceName.value = value
    }
  })

  return { filterString }
}
