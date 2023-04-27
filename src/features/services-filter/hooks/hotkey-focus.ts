import { onMounted, onBeforeUnmount } from 'vue'

import { createElementRef } from '@/shared'

export const useHotkeyFocus = () => {
  const inputElement = createElementRef<HTMLInputElement>()

  const keydownListener = (event: KeyboardEvent) => {
    if (event.altKey && event.code === 'KeyS') {
      inputElement.value.focus()
    }
  }

  onMounted(() => {
    addEventListener('keydown', keydownListener)
  })

  onBeforeUnmount(() => {
    removeEventListener('keydown', keydownListener)
  })

  return { inputElement }
}
