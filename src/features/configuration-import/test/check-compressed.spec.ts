import { describe, it, expect } from 'vitest'

import { checkCompressed } from '../lib/check-compressed'

describe('Checking compressed configuration', () => {
  it('should be defined', () => {
    expect(checkCompressed).toBeDefined()
  })

  it('should parse valid values', () => {
    expect(checkCompressed({})).toBe(true)
    expect(checkCompressed({ 'google.com': [3, { nelkor: 1 }] })).toBe(true)
    expect(checkCompressed({ 'vk.com': { fake: 1, nelkor: 2 } })).toBe(true)
  })

  it('should catch inaccuracies', () => {
    expect(checkCompressed(123)).toBe(false)
    expect(checkCompressed('123')).toBe(false)
    expect(checkCompressed({ 'google.com': { nelkor: '1' } })).toBe(false)
    expect(checkCompressed({ 'vk.com': [1, 2] })).toBe(true)
  })
})
