import { readDataByKey } from '../../actions'

export const getLsData = async (
  lsKey: string,
  iv: ArrayBuffer,
  key: CryptoKey,
) => {
  const lsData = localStorage.getItem(lsKey)

  if (!lsData) {
    return null
  }

  const data = await readDataByKey(lsData, iv, key)

  if (!data) {
    localStorage.removeItem(lsKey)

    return null
  }

  return data
}
