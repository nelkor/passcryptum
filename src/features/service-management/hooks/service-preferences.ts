import { ref, watch } from 'vue'
import type { ComputedRef } from 'vue'

import type {
  ServiceData,
  ServicePreferences,
} from '@/entities/services-config'

type EmitFn = (event: 'update-preferences', value: ServicePreferences) => void

export const useServicePreferences = (
  service: ComputedRef<ServiceData>,
  emit: EmitFn
) => {
  const { name, passwordLengthIndex, useSpecialCharacters } = service.value
  const innerService = ref({ name, passwordLengthIndex, useSpecialCharacters })

  watch(
    innerService,
    value => {
      emit('update-preferences', value)
    },
    { deep: true }
  )

  watch(
    service,
    value => {
      const { name, passwordLengthIndex, useSpecialCharacters } = value

      innerService.value = { name, passwordLengthIndex, useSpecialCharacters }
    },
    { deep: true }
  )

  return { innerService }
}
