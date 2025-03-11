import { base64ToBuffer, bufferToBase64 } from '#/core'

import { decrypt, pbkdf2, createAesKey, getBufferOfText } from '../../shared'
import {
  ORIGIN_BUFFER_ITERATIONS,
  ORIGIN_BUFFER_BYTE_LENGTH,
} from '../../constants'
import {
  getEncryptedHash,
  getEncryptedOnlineHash,
  createPinAesData,
} from '../../actions'
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
    throw new Error('The origin buffer must be 256 bytes long')
  }

  const {
    id,
    iv,
    lsKey,
    entropy,
    keyPairSeedBuffer,
    secretBoxIvBuffer,
    secretBoxKeyBuffer,
    cryptoKeyBuffer,
  } = parseOriginBuffer(buffer)

  const keyPairSeed = new Uint8Array(keyPairSeedBuffer)
  const secretBoxIv = new Uint8Array(secretBoxIvBuffer)
  const secretBoxKey = new Uint8Array(secretBoxKeyBuffer)
  const cryptoKey = await createAesKey(cryptoKeyBuffer)

  session = {
    iv,
    lsKey,
    entropy,
    cryptoKey,
    keyPairSeed,
    secretBoxIv,
    secretBoxKey,
    originBuffer: buffer,
  }

  return {
    id,
    data: await getLsData(lsKey, iv, cryptoKey),
  }
}

export const enterWithOriginPassword = async (
  password: string,
): Promise<StarterKit> =>
  startSession(
    await pbkdf2(
      getBufferOfText(password),
      ORIGIN_BUFFER_BYTE_LENGTH,
      ORIGIN_BUFFER_ITERATIONS,
    ),
  )

export const enterWithPin = async (pin: string): Promise<StarterKit> => {
  let hash = getEncryptedHash()

  if (!hash) {
    const onlineHash = await getEncryptedOnlineHash(pin)

    if (!onlineHash) {
      throw new Error('No encrypted hash available locally or online')
    }

    hash = bufferToBase64(onlineHash)
  }

  const { iv, key } = await createPinAesData(pin)

  return startSession(await decrypt(iv, key, base64ToBuffer(hash)))
}

export const exit = () => {
  session = null
}
