import { describe, it, expect } from 'vitest'

import { stringify } from '../lib/stringify'
import { exampleConfig, exampleCompressed } from './examples'

describe('Stringify services', () => {
  it('should be defined', () => {
    expect(stringify).toBeDefined()
  })

  it('should stringify empty config correctly', () => {
    expect(stringify([])).toBe('{}')
  })

  it('should stringify example correctly', () => {
    expect(stringify(exampleConfig)).toBe(exampleCompressed)
  })
})
