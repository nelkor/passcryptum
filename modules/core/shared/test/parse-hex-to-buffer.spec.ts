import { describe, it, expect } from 'vitest'

import { parseHexToBuffer } from '../lib/text'

const bufferToArray = (buffer: ArrayBuffer) =>
  Array.from(new Uint8Array(buffer))

describe('Parse hex to buffer', () => {
  it('should be defined', () => {
    expect(parseHexToBuffer).toBeDefined()
  })

  it('should parse hex strings', () => {
    expect(bufferToArray(parseHexToBuffer('dead'))).toEqual([222, 173])
    expect(bufferToArray(parseHexToBuffer('beef'))).toEqual([190, 239])
  })

  it('should throw error', () => {
    expect(() => parseHexToBuffer('hello')).toThrow()
    expect(() => parseHexToBuffer('world')).toThrow()
  })
})
