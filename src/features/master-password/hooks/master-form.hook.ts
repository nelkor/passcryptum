import { ref, computed } from 'vue'

import { setMasterPassword } from '@/entities/master-password'

export const useMasterForm = () => {
  const masterPassword = ref('')
  const hashesAreCalculated = ref(false)

  const isSubmitDisabled = computed(() =>
    Boolean(!masterPassword.value || hashesAreCalculated.value)
  )

  const onSubmit = () => {
    hashesAreCalculated.value = true

    setMasterPassword(masterPassword.value).then(() => {
      hashesAreCalculated.value = false
    })
  }

  return {
    masterPassword,
    isSubmitDisabled,
    onSubmit,
  }
}
