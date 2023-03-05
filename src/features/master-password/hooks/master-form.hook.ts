import { ref, computed } from 'vue'

import { setMasterPassword } from '@/entities/master-password'

export const useMasterForm = () => {
  const masterPassword = ref('')
  const isSubmitDisabled = computed(() => Boolean(!masterPassword.value))

  const onSubmit = () => {
    setMasterPassword(masterPassword.value)
  }

  return {
    masterPassword,
    isSubmitDisabled,
    onSubmit,
  }
}
