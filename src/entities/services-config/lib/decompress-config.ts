import type {
  ServicesConfig,
  CompressedConfig,
  LoginData,
  CompressedLogins,
  ServiceData,
  CompressedServiceData,
  CompressedServices,
} from '../types'

const decompressLogins = (logins: CompressedLogins): LoginData[] =>
  Object.entries(logins).map(([name, version]) => ({ name, version }))

const decompressServiceData = (
  name: string,
  data: CompressedServiceData
): ServiceData => {
  const options = Array.isArray(data) ? data[0] : 5
  const logins = Array.isArray(data) ? data[1] : data

  return {
    name,
    useSpecialCharacters: Boolean(options & 1),
    passwordLengthIndex: options >> 1,
    logins: decompressLogins(logins),
  }
}

const decompressServices = (services: CompressedServices): ServiceData[] =>
  Object.entries(services).map(([name, data]) =>
    decompressServiceData(name, data)
  )

export const decompressConfig = (config: CompressedConfig): ServicesConfig => ({
  popular: decompressServices(config[0]),
  custom: decompressServices(config[1]),
})
