import { describe, it, expect } from 'vitest'

import { getCharset } from '../lib/charset'

describe('Get charset', () => {
  it('should be defined', () => {
    expect(getCharset).toBeDefined()
  })

  it('should be the expected length', () => {
    expect(getCharset(true).join('').length).toBe(90)
    expect(getCharset(false).join('').length).toBe(62)
  })
})
