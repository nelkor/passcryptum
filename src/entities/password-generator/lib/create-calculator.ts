import { getBufferOfText, sha512, stringifyBuffer } from '@/shared'

import type { CalculatePassword } from '../types'
import { generatePassword } from './generate-password'
import { getCharset } from './charset'

export const createCalculator = async (
  password: string
): Promise<CalculatePassword> => {
  const buffer = getBufferOfText(password)

  const hash = stringifyBuffer(await sha512(buffer))

  return async (
    serviceName: string,
    loginName: string,
    version: number,
    useSpecialCharacters: boolean,
    length: number
  ) => {
    const charset = getCharset(useSpecialCharacters)
    const specialFlag = useSpecialCharacters ? 1 : 0

    const source = [
      hash,
      serviceName,
      loginName,
      version,
      specialFlag,
      length,
    ].join('/')

    const entropyBuffer = await sha512(getBufferOfText(source))

    return generatePassword(entropyBuffer, length, charset)
  }
}
