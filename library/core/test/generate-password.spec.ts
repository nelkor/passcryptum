import { webcrypto } from 'crypto'

import { describe, it, expect } from 'vitest'

import { generatePasswordFromBuffer } from '../actions/generate-password-from-buffer'

Object.defineProperty(global, 'crypto', { value: webcrypto })

const buffer1 = new Uint16Array([9999]).buffer
const buffer2 = new Uint16Array([12345]).buffer
const buffer3 = new Uint16Array([44444]).buffer

describe('password generation', () => {
  it('should be defined', () => {
    expect(generatePasswordFromBuffer).toBeDefined()
  })

  it('should generate passwords', async () => {
    expect(
      await generatePasswordFromBuffer(
        buffer1,
        'google.com',
        'nelkor@gmail.com',
        1,
        true,
        32
      )
    ).toBe('K^Y*"=xNScc}980TKP7$6/6C3oe6>E_F')

    expect(
      await generatePasswordFromBuffer(
        buffer2,
        'netflix.com',
        'Vladislav',
        2,
        false,
        8
      )
    ).toBe('Om8HFqAv')

    expect(
      await generatePasswordFromBuffer(
        buffer3,
        'vk.com',
        'xandefar',
        3,
        true,
        20
      )
    ).toBe(',V(GH37;}(iBt]d2iYq=')
  })
})
