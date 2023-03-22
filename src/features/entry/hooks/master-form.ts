import { ref, computed } from 'vue'

import { enter } from '../actions/enter'

export const useMasterForm = () => {
  const masterPassword = ref('')
  const hashesAreCalculated = ref(false)

  const isSubmitDisabled = computed(() =>
    Boolean(!masterPassword.value || hashesAreCalculated.value)
  )

  const onSubmit = () => {
    hashesAreCalculated.value = true

    enter(masterPassword.value).then(() => {
      hashesAreCalculated.value = false
    })
  }

  return {
    masterPassword,
    isSubmitDisabled,
    onSubmit,
  }
}
