import { webcrypto } from 'crypto'

import { describe, it, expect } from 'vitest'

import {
  encrypt,
  decrypt,
  sha512,
  getBufferOfText,
  stringifyBuffer,
  createCryptoKey,
  parseHexToBuffer,
  getTextFromBuffer,
} from '@/shared'

Object.defineProperty(global, 'crypto', { value: webcrypto })

const hash = await sha512(getBufferOfText('Random string'))

const iv = hash.slice(0, 16)
const keyData = hash.slice(16, 48)
const textToEncrypt = 'Symmetric encryption'

const expectedEncryption =
  'c6f32bc94d4e4a273cc7d2f697662d1b75ce5a7c38fc1f737f48b434b2afe552'

const key = await createCryptoKey(keyData)

describe('AES tools', () => {
  it('should be defined', () => {
    expect(encrypt).toBeDefined()
    expect(decrypt).toBeDefined()
  })

  it('should encrypt correctly', async () => {
    const encrypted = await encrypt(getBufferOfText(textToEncrypt), key, iv)

    expect(stringifyBuffer(encrypted)).toBe(expectedEncryption)
  })

  it('should decrypt correctly', async () => {
    const parsedBuffer = parseHexToBuffer(expectedEncryption)

    const decrypted = await decrypt(parsedBuffer, key, iv)

    expect(getTextFromBuffer(decrypted)).toBe(textToEncrypt)
  })
})
