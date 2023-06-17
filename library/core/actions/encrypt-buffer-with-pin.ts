import {
  AES_BUFFER_BYTES_LENGTH,
  AES_HASH_ITERATIONS,
  getBufferOfText,
  stringifyBuffer,
  getFingerprint,
  slowHash,
  encrypt,
} from '../tools'

export const createPinKeyBuffer = (pin: string) =>
  slowHash(
    getBufferOfText([pin, getFingerprint()].join()),
    AES_BUFFER_BYTES_LENGTH,
    AES_HASH_ITERATIONS
  )

export const encryptBufferWithPin = async (buffer: ArrayBuffer, pin: string) =>
  stringifyBuffer(await encrypt(buffer, await createPinKeyBuffer(pin)))
