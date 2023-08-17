export interface ActiveSession {
  originBuffer: ArrayBuffer
  lsKey: string
  entropy: ArrayBuffer
  iv: ArrayBuffer
  cryptoKey: CryptoKey
}

export interface StarterKit {
  id: string
  data: string | null
}
