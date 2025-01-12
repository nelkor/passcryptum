import { sign, secretbox } from 'tweetnacl'

export const generateTimestampBytes = (): Uint8Array => {
  const timestamp = Math.floor(Date.now() / 1000)
  const buffer = new ArrayBuffer(4)
  const view = new DataView(buffer)

  view.setUint32(0, timestamp, true)

  return new Uint8Array(buffer)
}

export const base64ToUint8Array = (base64: string): Uint8Array => {
  const binaryString = atob(base64)
  const { length } = binaryString
  const uint8Array = new Uint8Array(length)

  for (let i = 0; i < length; i++) {
    uint8Array[i] = binaryString.charCodeAt(i)
  }

  return uint8Array
}

export const uint8ArrayToBase64 = (data: Uint8Array): string =>
  btoa(String.fromCharCode(...data))

export const createSignature = (
  data: Uint8Array,
  secretKey: Uint8Array,
): Uint8Array => sign.detached(data, secretKey)

export const encryptData = (
  data: Uint8Array,
  iv: Uint8Array,
  key: Uint8Array,
): Uint8Array => secretbox(data, iv, key)

export const decryptData = (
  data: Uint8Array,
  iv: Uint8Array,
  key: Uint8Array,
): Uint8Array | null => secretbox.open(data, iv, key)

export const getKeyPairFromSeed = (
  keyPairSeed: Uint8Array,
): { secretKey: Uint8Array; publicKey: Uint8Array } => {
  const { secretKey, publicKey } = sign.keyPair.fromSeed(keyPairSeed)

  return { secretKey, publicKey }
}
