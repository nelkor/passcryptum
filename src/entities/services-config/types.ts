type CompressedLogins = Record<string, number>

// CompressedServiceOptions cannot be the number 5
// as this value is the default setting
type CompressedServiceOptions = 0 | 1 | 2 | 3 | 4 | 6 | 7

type CompressedServiceData =
  | [CompressedServiceOptions, CompressedLogins]
  | CompressedLogins

type CompressedServices = Record<string, CompressedServiceData>

export type CompressedConfig = [CompressedServices, CompressedServices]

interface Login {
  name: string
  version: number
}

interface ServiceData {
  name: string
  useSpecialCharacters: boolean
  passwordLength: number
  logins: Login[]
}

export interface ServicesConfig {
  popular: ServiceData[]
  custom: ServiceData[]
}
