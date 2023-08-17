import { describe, it, expect } from 'vitest'

import { parse } from '../lib/parse'
import {
  exampleConfig,
  exampleInvalid,
  exampleCompressed,
  exampleEmptyService,
  exampleEmptyServiceCompressed,
} from './examples'

describe('Parse string to services', () => {
  it('should be defined', () => {
    expect(parse).toBeDefined()
  })

  it('should not break on invalid data', () => {
    expect(parse(null)).toEqual([])
    expect(parse('?hello')).toEqual([])
    expect(parse(exampleInvalid)).toEqual([])
  })

  it('should parse empty config correctly', () => {
    expect(parse('{}')).toEqual([])
  })

  it('should parse empty service correctly', () => {
    expect(parse(exampleEmptyServiceCompressed)).toEqual(exampleEmptyService)
  })

  it('should parse example correctly', () => {
    expect(parse(exampleCompressed)).toEqual(exampleConfig)
  })
})
