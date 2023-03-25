import { ref, computed } from 'vue'

import { importText } from '../lib/import-text'

export const useTextImport = () => {
  const inputString = ref('')
  const importInProgress = ref(false)

  const isSubmitDisabled = computed(
    () => !inputString.value || importInProgress.value
  )

  const onSubmit = async () => {
    importInProgress.value = true

    if (await importText(inputString.value)) {
      inputString.value = ''

      alert('Text import was successful!')
    } else {
      alert('Error during text import!')
    }

    importInProgress.value = false
  }

  return {
    inputString,
    isSubmitDisabled,
    onSubmit,
  }
}
