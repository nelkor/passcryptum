import { calculate } from '@/entities/password-generator'
import type { LoginData, ServiceData } from '@/entities/services-config'
import { getPasswordLengthByIndex } from '@/shared'

export const getPasswordOfLogin = (service: ServiceData, login: LoginData) =>
  calculate(
    service.name,
    login.name,
    login.version,
    service.useSpecialCharacters,
    getPasswordLengthByIndex(service.passwordLengthIndex)
  )
