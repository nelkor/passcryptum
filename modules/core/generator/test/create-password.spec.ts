import { webcrypto } from 'crypto'

import { describe, expect, it } from 'vitest'

import { createPassword } from '../lib/create-password'
import { pbkdf2, getBufferOfText } from '../../shared'

Object.defineProperty(global, 'crypto', { value: webcrypto })

describe('Create password', () => {
  it('should be defined', () => {
    expect(createPassword).toBeDefined()
  })

  it('should create predictable passwords', async () => {
    const entropy = await pbkdf2(getBufferOfText('passcryptum'), 72, 8)

    expect(
      await createPassword(entropy, 'github.com', 'nelkor', 1, true, 20),
    ).toBe('|"$eAl9)"vxiOEm%$([.')

    expect(
      await createPassword(entropy, 'figma.com', 'vladislav', 1, false, 8),
    ).toBe('f3K9vH2W')

    expect(
      await createPassword(entropy, 'vk.com', 'farina', 11, true, 32),
    ).toBe('p`-mg[#z3Q%QU0|PxZi)&1FbbByQ58iq')
  })
})
