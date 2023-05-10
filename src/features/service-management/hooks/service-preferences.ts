import { ref, watch } from 'vue'
import type { ComputedRef } from 'vue'

import { updateServicePreferences } from '@/entities/services-config'
import type { ServiceData } from '@/entities/services-config'

import { saveConfiguration } from '../lib/save-configuration'

export const useServicePreferences = (service: ComputedRef<ServiceData>) => {
  const { name, passwordLengthIndex, useSpecialCharacters } = service.value
  const innerService = ref({ name, passwordLengthIndex, useSpecialCharacters })

  const checkIsInputActive = (index: number) =>
    innerService.value.passwordLengthIndex === index

  watch(
    [
      () => innerService.value.passwordLengthIndex,
      () => innerService.value.useSpecialCharacters,
    ],
    () => {
      updateServicePreferences(innerService.value)
      saveConfiguration()
    }
  )

  watch(
    service,
    value => {
      const { name, passwordLengthIndex, useSpecialCharacters } = value

      innerService.value = { name, passwordLengthIndex, useSpecialCharacters }
    },
    { deep: true }
  )

  return {
    innerService,
    checkIsInputActive,
  }
}
