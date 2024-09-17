import { ServicesConfig } from '../../types'
import { isValidPasswordLengthIndex } from '../../shared'

const getService = (config: ServicesConfig, name: string) =>
  config.find(service => service.name === name)

const getExistingService = (config: ServicesConfig, name: string) => {
  const service = getService(config, name)

  if (!service) {
    throw new Error(`The service "${name}" does not exist`)
  }

  return service
}

export const createEmptyServices = (): ServicesConfig => []

export const checkForEmptiness = (config: ServicesConfig) => !config.length

export const add = (
  config: ServicesConfig,
  serviceName: string,
  loginName = '',
) => {
  if (!serviceName) {
    throw new Error('The name of a new service can not be empty')
  }

  const existingService = getService(config, serviceName)
  const newLogin = loginName && { name: loginName, version: 1 }

  if (existingService) {
    if (
      !existingService.logins.some(({ name }) => name === loginName) &&
      newLogin
    ) {
      existingService.logins.unshift(newLogin)
    }
  } else {
    config.unshift({
      name: serviceName,
      useSpecialCharacters: true,
      passwordLengthIndex: 2,
      logins: newLogin ? [newLogin] : [],
    })
  }
}

export const updateVersionOfLogin = (
  config: ServicesConfig,
  serviceName: string,
  loginName: string,
  version: number,
) => {
  const service = getExistingService(config, serviceName)
  const login = service.logins.find(({ name }) => name === loginName)

  if (!login) {
    throw new Error(`The login "${loginName}" does not exist`)
  }

  login.version = version
}

export const deleteService = (config: ServicesConfig, name: string) => {
  config.splice(config.indexOf(getExistingService(config, name)), 1)
}

export const deleteLogin = (
  config: ServicesConfig,
  serviceName: string,
  loginName: string,
) => {
  const service = getExistingService(config, serviceName)
  const index = service.logins.findIndex(({ name }) => name === loginName)

  if (~index) {
    service.logins.splice(index, 1)
  }
}

export const updateServicePreferences = (
  config: ServicesConfig,
  name: string,
  passwordLengthIndex: number,
  useSpecialCharacters: boolean,
) => {
  if (!isValidPasswordLengthIndex(passwordLengthIndex)) {
    throw new Error('Invalid password length index')
  }

  const service = getExistingService(config, name)

  service.passwordLengthIndex = passwordLengthIndex
  service.useSpecialCharacters = useSpecialCharacters
}
