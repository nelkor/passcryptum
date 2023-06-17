import { webcrypto } from 'crypto'

import { describe, it, expect } from 'vitest'

import { createId } from '../actions/create-id'

Object.defineProperty(global, 'crypto', { value: webcrypto })

describe('ID creation', () => {
  it('should be defined', () => {
    expect(createId).toBeDefined()
  })

  it('should create ID correctly', () => {
    const buffer1 = new Uint16Array([100, 300, 511, 601]).buffer
    const buffer2 = new Uint16Array([1125, 2236, 3346, 4453]).buffer
    const buffer3 = new Uint16Array([45688, 34567, 23460, 12339]).buffer

    expect(createId(buffer1)).toBe('WORD')
    expect(createId(buffer2)).toBe('HASH')
    expect(createId(buffer3)).toBe('PING')
  })
})
