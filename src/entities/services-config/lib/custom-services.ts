import { computed } from 'vue'

import { servicesConfig } from '../model/service-config'
import type { ServicePreferences } from '../types'
import { createService, createLogin } from './creation-tools'

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

export const addLoginToCustomService = (serviceName: string, name: string) => {
  const service = getCustomServiceByName(serviceName)

  if (!service) {
    throw new Error('Attempt to create login in non-existent custom service')
  }

  service.logins.unshift(createLogin(name))
}

export const setVersionOfLoginInCustomService = (
  serviceName: string,
  loginName: string,
  version: number
) => {
  const service = getCustomServiceByName(serviceName)

  if (!service) {
    throw new Error(
      'Attempt to set version of login in non-existent custom service'
    )
  }

  const editableLogin = service.logins.find(login => login.name === loginName)

  if (!editableLogin) {
    throw new Error(
      'Attempt to set version of non-existent login in custom service'
    )
  }

  editableLogin.version = version
}
