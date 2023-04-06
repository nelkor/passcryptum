import type {
  ServicesConfig,
  CompressedConfig,
  LoginData,
  CompressedLogins,
  ServiceData,
  CompressedServiceData,
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

export const decompressConfig = (config: CompressedConfig): ServicesConfig =>
  Object.entries(config).map(([name, data]) =>
    decompressServiceData(name, data)
  )
