import type {
  ServicesConfig,
  CompressedConfig,
  LoginData,
  CompressedLogins,
  ServiceData,
  CompressedServiceData,
  CompressedServiceOptions,
  CompressedServices,
} from '../types'

const compressLogins = (logins: LoginData[]): CompressedLogins =>
  logins.reduce<CompressedLogins>((acc, { name, version }) => {
    acc[name] = version

    return acc
  }, {})

const compressServiceData = (data: ServiceData): CompressedServiceData => {
  const logins = compressLogins(data.logins)

  const options =
    (data.passwordLengthIndex << 1) + Number(data.useSpecialCharacters)

  if (options < 0 || options > 7) {
    throw new Error('invalid options while compressing')
  }

  return options === 5 ? logins : [options as CompressedServiceOptions, logins]
}

const compressServices = (services: ServiceData[]): CompressedServices =>
  services.reduce<CompressedServices>((acc, cur) => {
    acc[cur.name] = compressServiceData(cur)

    return acc
  }, {})

export const compressConfig = (config: ServicesConfig): CompressedConfig => [
  compressServices(config.popular),
  compressServices(config.custom),
]
