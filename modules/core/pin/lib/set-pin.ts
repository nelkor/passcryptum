import { getSession } from '../../session'
import { LS_KEY_PIN } from '../../constants'
import { createPinAesData } from '../../actions'
import { encrypt, stringifyBuffer } from '../../shared'

export const setPin = async (pin: string) => {
  const { originBuffer } = getSession()
  const { iv, key } = await createPinAesData(pin)

  localStorage.setItem(
    LS_KEY_PIN,
    stringifyBuffer(await encrypt(iv, key, originBuffer)),
  )
}
