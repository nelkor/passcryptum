import { getSession } from '../../session'
import { createPassword } from './create-password'

export const generatePassword = (
  serviceName: string,
  login: string,
  version: number,
  useSymbols: boolean,
  length: number,
) => {
  const { entropy } = getSession()

  return createPassword(
    entropy,
    serviceName,
    login,
    version,
    useSymbols,
    length,
  )
}
