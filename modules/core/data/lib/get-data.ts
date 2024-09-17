import { getSession } from '../../session'
import { readDataByKey } from '../../actions'
import { parseHexToBuffer } from '../../shared'

const tryParseHex = (data: string) => {
  try {
    return parseHexToBuffer(data)
  } catch (e) {
    void e

    return null
  }
}

const getData = async () => {
  const { lsKey, iv, cryptoKey } = getSession()
  const str = localStorage.getItem(lsKey)

  if (!str) {
    return null
  }

  const buffer = tryParseHex(str)
  const decrypted = buffer && (await readDataByKey(buffer, iv, cryptoKey))

  if (!buffer || !decrypted) {
    localStorage.removeItem(lsKey)

    return null
  }

  return { str, buffer, decrypted }
}

export const getDataAsString = async () => {
  const data = await getData()

  return data && data.str
}

export const getDataDecrypted = async () => {
  const data = await getData()

  return data && data.decrypted
}

export const getDataAsBuffer = async () => {
  const data = await getData()

  return data && data.buffer
}
