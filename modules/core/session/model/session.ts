import {
  decrypt,
  pbkdf2,
  createAesKey,
  getBufferOfText,
  parseHexToBuffer,
} from '../../shared'
import {
  ORIGIN_BUFFER_ITERATIONS,
  ORIGIN_BUFFER_BYTE_LENGTH,
} from '../../constants'
import { getEncryptedHash, createPinAesData } from '../../actions'
import { getLsData } from '../lib/get-ls-data'
import { parseOriginBuffer } from '../lib/parse-origin-buffer'
import { ActiveSession, StarterKit } from '../types'

let session: ActiveSession | null = null

export const getSession = () => {
  if (!session) {
    throw new Error('Attempt to access an inactive session')
  }

  return session
}

const startSession = async (buffer: ArrayBuffer): Promise<StarterKit> => {
  if (buffer.byteLength !== ORIGIN_BUFFER_BYTE_LENGTH) {
    throw new Error('The origin buffer must be 128 bytes long')
  }

  const { id, iv, lsKey, entropy, cryptoKeyBuffer } = parseOriginBuffer(buffer)

  const cryptoKey = await createAesKey(cryptoKeyBuffer)

  session = {
    iv,
    lsKey,
    entropy,
    cryptoKey,
    originBuffer: buffer,
  }

  return {
    id,
    data: await getLsData(lsKey, iv, cryptoKey),
  }
}

export const enterWithMasterPassword = async (
  password: string
): Promise<StarterKit> =>
  startSession(
    await pbkdf2(
      getBufferOfText(password),
      ORIGIN_BUFFER_BYTE_LENGTH,
      ORIGIN_BUFFER_ITERATIONS
    )
  )

export const enterWithPin = async (pin: string): Promise<StarterKit> => {
  const hash = getEncryptedHash()

  if (!hash) {
    throw new Error('No PIN in localStorage')
  }

  const { iv, key } = await createPinAesData(pin)

  return startSession(await decrypt(iv, key, parseHexToBuffer(hash)))
}

export const exit = () => {
  session = null
}
