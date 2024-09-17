import { generatePassword } from '#/core'
import { LoginData, ServiceData, passwordLengthVariants } from '#/services'

import { writeToClipboard } from '@/shared'

export const writePasswordToClipboard = (
  service: ServiceData,
  login: LoginData,
) => {
  writeToClipboard(
    generatePassword(
      service.name,
      login.name,
      login.version,
      service.useSpecialCharacters,
      passwordLengthVariants[service.passwordLengthIndex],
    ),
  )
}
