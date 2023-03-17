import { describe, it, expect } from 'vitest'

import { compressConfig } from '../lib/compress-config'
import {
  emptyConfig,
  emptyCompressed,
  filledConfig,
  filledCompressed,
} from './examples'

describe('Compress service config', () => {
  it('should be defined', () => {
    expect(compressConfig).toBeDefined()
  })

  it('should compress empty config correctly', () => {
    expect(compressConfig(emptyConfig)).toEqual(emptyCompressed)
  })

  it('should compress filled config correctly', () => {
    expect(compressConfig(filledConfig)).toEqual(filledCompressed)
  })
})
