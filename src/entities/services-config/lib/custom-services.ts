import { computed } from 'vue'

import { servicesConfig } from '../model/service-config'
import type { ServicePreferences } from '../types'
import { createService } from './creation-tools'

export const customServices = computed(() => servicesConfig.value.custom)

export const getCustomServiceByName = (name: string) =>
  customServices.value.find(service => service.name === name)

export const addCustomService = (name: string) => {
  if (getCustomServiceByName(name)) {
    throw new Error('Trying to create new custom service with an existing name')
  }

  servicesConfig.value.custom.push(createService(name))
}

export const updateCustomServicePreferences = ({
  name,
  passwordLengthIndex,
  useSpecialCharacters,
}: ServicePreferences) => {
  const service = getCustomServiceByName(name)

  if (!service) {
    throw new Error('Attempt to update a non-existent service')
  }

  service.passwordLengthIndex = passwordLengthIndex
  service.useSpecialCharacters = useSpecialCharacters
}

export const deleteCustomServiceByName = (name: string) => {
  const index = customServices.value.findIndex(service => service.name === name)

  if (index === -1) {
    throw new Error('Attempt to delete a non-existent custom service')
  }

  servicesConfig.value.custom.splice(index, 1)
}
