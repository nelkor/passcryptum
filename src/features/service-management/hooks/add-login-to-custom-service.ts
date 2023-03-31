import { computed, ref } from 'vue'
import type { ComputedRef } from 'vue'

import { addLoginToCustomService } from '@/entities/services-config'
import type { ServiceData } from '@/entities/services-config'

export const useAddLoginToCustomService = (
  service: ComputedRef<ServiceData>
) => {
  const newLogin = ref('')

  const isSubmitDisabled = computed(
    () =>
      !newLogin.value ||
      service.value.logins.some(login => login.name === newLogin.value)
  )

  const onSubmit = () => {
    addLoginToCustomService(service.value.name, newLogin.value)

    newLogin.value = ''
  }

  return {
    newLogin,
    isSubmitDisabled,
    onSubmit,
  }
}
