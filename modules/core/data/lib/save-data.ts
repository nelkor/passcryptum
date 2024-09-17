import { getSession } from '../../session'
import { encrypt, getBufferOfText, stringifyBuffer } from '../../shared'

export const saveData = async (data: string) => {
  const { lsKey, iv, cryptoKey } = getSession()

  localStorage.setItem(
    lsKey,
    stringifyBuffer(await encrypt(iv, cryptoKey, getBufferOfText(data))),
  )
}
