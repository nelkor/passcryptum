import { ref, computed, onMounted } from 'vue'

import { createElementRef } from '@/shared'

import { enter } from '../actions/enter'

export const useMasterForm = () => {
  const masterPassword = ref('')
  const hashesAreCalculated = ref(false)
  const inputElement = createElementRef<HTMLInputElement>()

  const isSubmitDisabled = computed(() =>
    Boolean(!masterPassword.value || hashesAreCalculated.value)
  )

  const onSubmit = () => {
    hashesAreCalculated.value = true

    enter(masterPassword.value).then(() => {
      hashesAreCalculated.value = false
    })
  }

  onMounted(() => {
    inputElement.value.focus()
  })

  return {
    masterPassword,
    isSubmitDisabled,
    inputElement,
    onSubmit,
  }
}
