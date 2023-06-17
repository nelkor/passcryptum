import {
  sha512,
  getBufferOfText,
  concatBuffers,
  getCharset,
  createPassword,
} from '../tools'

export const generatePasswordFromBuffer = async (
  buffer: ArrayBuffer,
  serviceName: string,
  login: string,
  version: number,
  useSymbols: boolean,
  length: number
) => {
  const paramsString = [serviceName, login, version, useSymbols, length].join()
  const paramsBuffer = getBufferOfText(paramsString)

  const hash = await sha512(concatBuffers(buffer, paramsBuffer))

  return createPassword(hash, length, getCharset(useSymbols))
}
