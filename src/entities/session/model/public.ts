import {
  add,
  stringify,
  deleteLogin,
  deleteService,
  ServicesConfig,
  checkForEmptiness,
  mergeConfigurations,
  createEmptyServices,
  updateVersionOfLogin,
  updateServicePreferences,
} from '#/services'
import { ref, computed } from 'vue'
import { saveData, deleteData } from '#/core'

import { privateServices, privateIsPinSet, privateSessionId } from './private'

export const isCalculationInProgress = ref(false)

export const isPinSet = computed(() => privateIsPinSet.value)

export const setPinState = (value: boolean) => {
  privateIsPinSet.value = value
}

export const sessionId = computed(() => privateSessionId.value)

const saveServices = () => saveData(stringify(privateServices.value))

export const addServiceAndLogin = (serviceName: string, loginName: string) => {
  add(privateServices.value, serviceName.trim(), loginName.trim())

  return saveServices()
}

export const importServices = (newServices: ServicesConfig) => {
  privateServices.value = mergeConfigurations(
    privateServices.value,
    newServices,
  )

  return saveServices()
}

export const areServicesEmpty = computed(() =>
  checkForEmptiness(privateServices.value),
)

export const clearServices = () => {
  deleteData()

  privateServices.value = createEmptyServices()
}

export const setServicePreferences = (
  name: string,
  passwordLengthIndex: number,
  useSpecialCharacters: boolean,
) => {
  updateServicePreferences(
    privateServices.value,
    name,
    passwordLengthIndex,
    useSpecialCharacters,
  )

  return saveServices()
}

export const rmService = (name: string) => {
  deleteService(privateServices.value, name)

  return saveServices()
}

export const rmLogin = (serviceName: string, loginName: string) => {
  deleteLogin(privateServices.value, serviceName, loginName)

  return saveServices()
}

export const setVersionOfLogin = (
  serviceName: string,
  loginName: string,
  version: number,
) => {
  updateVersionOfLogin(privateServices.value, serviceName, loginName, version)

  return saveServices()
}
