import {
  pbkdf2,
  createAesKey,
  getFingerprint,
  getBufferOfText,
} from '../../shared'
import { PIN_BUFFER_BYTE_LENGTH, PIN_BUFFER_ITERATIONS } from '../../constants'

export const createPinAesData = async (pin: string) => {
  const buffer = await pbkdf2(
    getBufferOfText([pin, getFingerprint()].join()),
    PIN_BUFFER_BYTE_LENGTH,
    PIN_BUFFER_ITERATIONS,
  )

  return {
    iv: buffer.slice(0, 16),
    key: await createAesKey(buffer.slice(16)),
  }
}
