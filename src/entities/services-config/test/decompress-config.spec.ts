import { describe, it, expect } from 'vitest'

import { decompressConfig } from '../lib/decompress-config'
import {
  emptyConfig,
  emptyCompressed,
  filledConfig,
  filledCompressed,
} from './examples'

describe('Decompress service config', () => {
  it('should be defined', () => {
    expect(decompressConfig).toBeDefined()
  })

  it('should decompress empty config correctly', () => {
    expect(decompressConfig(emptyCompressed)).toEqual(emptyConfig)
  })

  it('should decompress filled config correctly', () => {
    expect(decompressConfig(filledCompressed)).toEqual(filledConfig)
  })
})
