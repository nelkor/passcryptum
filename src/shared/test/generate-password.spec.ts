import { webcrypto } from 'crypto'

import { describe, it, expect } from 'vitest'

import { sha512, getBufferOfText } from '@/shared'

import { generatePassword } from '../lib/generate-password'

Object.defineProperty(global.self, 'crypto', { value: webcrypto })

const buffer1 = await sha512(getBufferOfText('Thoughts'))
const buffer2 = await sha512(getBufferOfText('rule'))
const buffer3 = await sha512(getBufferOfText('the'))
const buffer4 = await sha512(getBufferOfText('world'))

const charset1 = [
  '0123456789',
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  'abcdefghijklmnopqrstuvwxyz',
  '`!@#$%^&*()-_=+{[]};:"|/.,<>',
]

const charset2 = [
  'A',
  'B',
  'C',
  '________________________________________________________________'.repeat(10),
]

describe('Generate password', () => {
  it('should be defined', () => {
    expect(generatePassword).toBeDefined()
  })

  it('should throw errors', () => {
    expect(() => generatePassword(buffer1, 3, charset1)).toThrowError(
      'Password length is less than charset length'
    )

    expect(() => generatePassword(buffer1, 33, charset1)).toThrowError(
      'Password length is more than half the buffer size'
    )
  })

  it('should generate passwords', () => {
    expect(generatePassword(buffer1, 8, charset1)).toBe('E*0V|QoO')
    expect(generatePassword(buffer2, 12, charset1)).toBe('6QW33|u.&,No')
    expect(generatePassword(buffer3, 20, charset1)).toBe('tE{xS(e&[CRS{esS"5QO')

    expect(generatePassword(buffer4, 32, charset1)).toBe(
      'cyM}3O;b|Kr%nFBQ5t&H7)`u0^Vod^V,'
    )
  })

  it('should guarantee the presence of every part of the charset', () => {
    expect(
      generatePassword(buffer1, 8, [...charset1, ' ']).includes(' ')
    ).toBeTruthy()
  })

  it('should evenly distribute positions of guaranteed characters', () => {
    expect(generatePassword(buffer1, 20, charset2)).toBe('________A____BC_____')
    expect(generatePassword(buffer2, 20, charset2)).toBe('___B____A__C________')
    expect(generatePassword(buffer3, 20, charset2)).toBe('___C_____________AB_')
    expect(generatePassword(buffer4, 20, charset2)).toBe('___C____A_________B_')
  })
})
