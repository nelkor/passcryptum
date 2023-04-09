import { ref, computed } from 'vue'

import { getServiceByName, addService } from '@/entities/services-config'

export const useServiceAdder = () => {
  const serviceName = ref('')

  const isSubmitDisabled = computed(
    () => !serviceName.value || Boolean(getServiceByName(serviceName.value))
  )

  const onSubmit = () => {
    addService(serviceName.value)

    serviceName.value = ''
  }

  return {
    serviceName,
    isSubmitDisabled,
    onSubmit,
  }
}
