export interface ActiveSession {
  iv: ArrayBuffer
  lsKey: string
  entropy: ArrayBuffer
  cryptoKey: CryptoKey
  keyPairSeed: Uint8Array
  secretBoxIv: Uint8Array
  secretBoxKey: Uint8Array
  originBuffer: ArrayBuffer
}

export interface StarterKit {
  id: string
  data: string | null
}
