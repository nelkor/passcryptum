import { computed } from 'vue'
import {
  add,
  stringify,
  deleteLogin,
  deleteService,
  ServicesConfig,
  checkForEmptiness,
  createEmptyServices,
  mergeConfigurations,
  updateVersionOfLogin,
  updateServicePreferences,
} from '#/services'
import { deleteData, saveData } from '#/core'

import { privateServices, privateIsPinSet, privateSessionId } from './private'

const saveServices = () => void saveData(stringify(privateServices.value))

export const setPinState = (value: boolean) => {
  privateIsPinSet.value = value
}

export const isPinSet = computed(() => privateIsPinSet.value)

export const services = computed(() => privateServices.value)

export const sessionId = computed(() => privateSessionId.value)

export const areServicesEmpty = computed(() =>
  checkForEmptiness(services.value)
)

export const clearServices = () => {
  deleteData()

  privateServices.value = createEmptyServices()
}

export const addServiceAndLogin = (serviceName: string, loginName: string) => {
  add(privateServices.value, serviceName, loginName)
  saveServices()
}

export const setVersionOfLogin = (
  serviceName: string,
  loginName: string,
  version: number
) => {
  updateVersionOfLogin(privateServices.value, serviceName, loginName, version)
  saveServices()
}

export const setServicePreferences = (
  name: string,
  passwordLengthIndex: number,
  useSpecialCharacters: boolean
) => {
  updateServicePreferences(
    privateServices.value,
    name,
    passwordLengthIndex,
    useSpecialCharacters
  )

  saveServices()
}

export const rmService = (name: string) => {
  deleteService(privateServices.value, name)
  saveServices()
}

export const rmLogin = (serviceName: string, loginName: string) => {
  deleteLogin(privateServices.value, serviceName, loginName)
  saveServices()
}

export const importServices = (newServices: ServicesConfig) => {
  privateServices.value = mergeConfigurations(
    privateServices.value,
    newServices
  )
}
