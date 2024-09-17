import type { ServicesConfig, ServiceData, LoginData } from '../../types'

const copyService = ({
  name,
  useSpecialCharacters,
  passwordLengthIndex,
  logins,
}: ServiceData): ServiceData => ({
  name,
  useSpecialCharacters,
  passwordLengthIndex,
  logins: logins.map(login => ({ ...login })),
})

const mergeLogins = (basis: LoginData[], added: LoginData[]): LoginData[] => {
  const newLogins: LoginData[] = []
  const basisVersions = new Map(basis.map(login => [login.name, login.version]))

  added.forEach(login => {
    const basisVersion = basisVersions.get(login.name)

    if (!basisVersion) {
      newLogins.push(login)

      return
    }

    basisVersions.set(login.name, Math.max(basisVersion, login.version))
  })

  return [
    ...newLogins,
    ...Array.from(basisVersions, ([name, version]) => ({ name, version })),
  ]
}

export const mergeConfigurations = (
  basis: ServicesConfig,
  added: ServicesConfig,
): ServicesConfig => {
  const newServices: ServicesConfig = []

  const basisServices = new Map(
    basis.map(service => [service.name, copyService(service)]),
  )

  added.forEach(addedService => {
    const basisService = basisServices.get(addedService.name)

    if (!basisService) {
      newServices.push(copyService(addedService))

      return
    }

    basisService.passwordLengthIndex = addedService.passwordLengthIndex
    basisService.useSpecialCharacters = addedService.useSpecialCharacters
    basisService.logins = mergeLogins(basisService.logins, addedService.logins)
  })

  return [...newServices, ...basisServices.values()]
}
