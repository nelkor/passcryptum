import { computed, watch } from 'vue'

import { setIsEntered } from '@/dom'
import { sessionId } from '@/entities/session'

export const useAppHeader = () => {
  const isEntered = computed(() => Boolean(sessionId.value))

  watch(isEntered, setIsEntered, { immediate: true })

  return { isEntered }
}
