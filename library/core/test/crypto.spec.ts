import { webcrypto } from 'crypto'

import { describe, it, expect } from 'vitest'

import {
  getTextFromBuffer,
  parseHexToBuffer,
  stringifyBuffer,
  getBufferOfText,
  slowHash,
  encrypt,
  decrypt,
  AES_BUFFER_BYTES_LENGTH,
} from '../tools'

Object.defineProperty(global, 'crypto', { value: webcrypto })

const buffer1 = new Uint16Array([1337]).buffer
const buffer2 = new Uint16Array([12345]).buffer
const buffer3 = new Uint16Array([55555]).buffer

const quote = {
  normal: 'May the Force be with you.',
  encrypted: '13eba8925815a5e25ac9102e0a85d26fa0b46674a980884980886ed511cb2efc',
  buffer: buffer1,
  iterations: 1,
}

describe('crypto', () => {
  it('should create slow hashes correctly', async () => {
    const hash1 = await slowHash(buffer1, 8, 1)
    const hash2 = await slowHash(buffer2, 8, 512)
    const hash3 = await slowHash(buffer3, 8, 2048)

    expect(stringifyBuffer(hash1)).toBe('97a1fa2b8bd30e0d')
    expect(stringifyBuffer(hash2)).toBe('a679c515f21dba99')
    expect(stringifyBuffer(hash3)).toBe('ec04003e861d7773')
  })

  it('should encrypt correctly', async () => {
    const bufferToEncrypt = getBufferOfText(quote.normal)

    const keyBuffer = await slowHash(
      quote.buffer,
      AES_BUFFER_BYTES_LENGTH,
      quote.iterations
    )

    const encryptedBuffer = await encrypt(bufferToEncrypt, keyBuffer)

    expect(stringifyBuffer(encryptedBuffer)).toBe(quote.encrypted)
  })

  it('should decrypt correctly', async () => {
    const bufferToDecrypt = parseHexToBuffer(quote.encrypted)

    const keyBuffer = await slowHash(
      quote.buffer,
      AES_BUFFER_BYTES_LENGTH,
      quote.iterations
    )

    const decryptedBuffer = await decrypt(bufferToDecrypt, keyBuffer)

    expect(getTextFromBuffer(decryptedBuffer)).toBe(quote.normal)
  })
})
