import { ref, computed } from 'vue'

import {
  getCustomServiceByName,
  addCustomService,
} from '@/entities/services-config'

export const useAddCustomService = () => {
  const serviceName = ref('')

  const isSubmitDisabled = computed(
    () =>
      !serviceName.value || Boolean(getCustomServiceByName(serviceName.value))
  )

  const onSubmit = () => {
    addCustomService(serviceName.value)

    serviceName.value = ''
  }

  return {
    serviceName,
    isSubmitDisabled,
    onSubmit,
  }
}
