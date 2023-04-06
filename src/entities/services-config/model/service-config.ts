import { ref, computed } from 'vue'

import {
  createEmptyConfig,
  createService,
  createLogin,
} from '../lib/creation-tools'
import { compressConfig } from '../lib/compress-config'
import { decompressConfig } from '../lib/decompress-config'
import type { ServicesConfig, ServicePreferences } from '../types'

export const servicesConfig = ref<ServicesConfig>(createEmptyConfig())

export const compressedConfigText = computed(() =>
  JSON.stringify(compressConfig(servicesConfig.value))
)

const savedConfig = ref(compressedConfigText.value)

export const isConfigSaved = computed(
  () => savedConfig.value === compressedConfigText.value
)

export const isConfigEmpty = computed(() => servicesConfig.value.length === 0)

export const setServicesConfig = (config: ServicesConfig) => {
  servicesConfig.value = config
  savedConfig.value = compressedConfigText.value
}

export const saveConfig = () => {
  savedConfig.value = compressedConfigText.value
}

export const cancelChanges = () => {
  servicesConfig.value = decompressConfig(JSON.parse(savedConfig.value))
}

export const clearServicesConfig = () => {
  setServicesConfig(createEmptyConfig())
}

export const getServiceByName = (name: string) =>
  servicesConfig.value.find(service => service.name === name)

export const addService = (name: string) => {
  if (getServiceByName(name)) {
    throw new Error('Trying to create new service with an existing name')
  }

  servicesConfig.value.unshift(createService(name))
}

export const updateServicePreferences = ({
  name,
  passwordLengthIndex,
  useSpecialCharacters,
}: ServicePreferences) => {
  const service = getServiceByName(name)

  if (!service) {
    throw new Error('Attempt to update a non-existent service')
  }

  service.passwordLengthIndex = passwordLengthIndex
  service.useSpecialCharacters = useSpecialCharacters
}

export const deleteServiceByName = (name: string) => {
  const index = servicesConfig.value.findIndex(service => service.name === name)

  if (index === -1) {
    throw new Error('Attempt to delete a non-existent service')
  }

  servicesConfig.value.splice(index, 1)
}

export const addLoginToService = (serviceName: string, name: string) => {
  const service = getServiceByName(serviceName)

  if (!service) {
    throw new Error('Attempt to create login in non-existent service')
  }

  service.logins.unshift(createLogin(name))
}

export const setVersionOfLoginInService = (
  serviceName: string,
  loginName: string,
  version: number
) => {
  const service = getServiceByName(serviceName)

  if (!service) {
    throw new Error('Attempt to set version of login in non-existent service')
  }

  const editableLogin = service.logins.find(login => login.name === loginName)

  if (!editableLogin) {
    throw new Error('Attempt to set version of non-existent login in service')
  }

  editableLogin.version = version
}
