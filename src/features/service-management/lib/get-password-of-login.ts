import { getMasterTool } from '@/entities/master-tool'
import type { LoginData, ServiceData } from '@/entities/services-config'
import {
  getPasswordLengthByIndex,
  getCharset,
  getBufferOfText,
  sha512,
  generatePassword,
} from '@/shared'

export const getPasswordOfLogin = async (
  service: ServiceData,
  login: LoginData
) => {
  const { hash } = getMasterTool()
  const serviceName = service.name
  const { name, version } = login
  const special = service.useSpecialCharacters ? 1 : 0
  const length = getPasswordLengthByIndex(service.passwordLengthIndex)
  const charset = getCharset(service.useSpecialCharacters)
  const source = [hash, serviceName, name, version, special, length].join('/')
  const sourceBuffer = getBufferOfText(source)

  const entropyBuffer = await sha512(sourceBuffer)

  return generatePassword(entropyBuffer, length, charset)
}
