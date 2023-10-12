import { getSession } from '../../session'
import { readDataByKey } from '../../actions'

export const readData = (data: string | ArrayBuffer) => {
  const { iv, cryptoKey } = getSession()

  return readDataByKey(data, iv, cryptoKey)
}
