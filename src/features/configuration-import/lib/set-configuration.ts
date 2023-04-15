import {
  servicesConfig,
  compressedConfigText,
  setServicesConfig,
} from '@/entities/services-config'
import { getMasterTool } from '@/entities/master-tool'
import type { ServicesConfig, LoginData } from '@/entities/services-config'
import { stringifyBuffer, getBufferOfText, encrypt } from '@/shared'

const mergeConfigurations = (
  basis: ServicesConfig,
  added: ServicesConfig
): ServicesConfig => {
  const newServices: ServicesConfig = []

  added.forEach(addedService => {
    const existingService = basis.find(
      service => service.name === addedService.name
    )

    if (!existingService) {
      newServices.push(addedService)

      return
    }

    const newLogins: LoginData[] = []

    addedService.logins.forEach(addedLogin => {
      const existingLogin = existingService.logins.find(
        login => login.name === addedLogin.name
      )

      if (!existingLogin) {
        newLogins.push(addedLogin)

        return
      }

      if (addedLogin.version > existingLogin.version) {
        existingLogin.version = addedLogin.version
      }
    })

    existingService.useSpecialCharacters = addedService.useSpecialCharacters
    existingService.passwordLengthIndex = addedService.passwordLengthIndex
    existingService.logins = [...newLogins, ...existingService.logins]
  })

  return [...newServices, ...basis]
}

export const setConfiguration = async (config: ServicesConfig) => {
  setServicesConfig(mergeConfigurations(servicesConfig.value, config))

  const { shortHash, key, iv } = getMasterTool()
  const compressedConfigBuffer = getBufferOfText(compressedConfigText.value)

  const encryptedConfigBuffer = await encrypt(compressedConfigBuffer, key, iv)

  localStorage.setItem(shortHash, stringifyBuffer(encryptedConfigBuffer))
}
