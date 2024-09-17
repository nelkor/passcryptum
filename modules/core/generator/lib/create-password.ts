import {
  pbkdf2,
  getCharset,
  concatBuffers,
  formatPassword,
  getBufferOfText,
} from '../../shared'
import {
  PASSWORD_BUFFER_ITERATIONS,
  PASSWORD_BUFFER_BYTE_LENGTH,
} from '../../constants'

export const createPassword = async (
  entropy: ArrayBuffer,
  serviceName: string,
  login: string,
  version: number,
  useSymbols: boolean,
  length: number,
) => {
  const paramsString = [login, length, version, useSymbols, serviceName].join()

  const buffer = await pbkdf2(
    concatBuffers(entropy, getBufferOfText(paramsString)),
    PASSWORD_BUFFER_BYTE_LENGTH,
    PASSWORD_BUFFER_ITERATIONS,
  )

  return formatPassword(buffer, length, getCharset(useSymbols))
}
