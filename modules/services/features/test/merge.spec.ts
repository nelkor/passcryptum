import { describe, it, expect } from 'vitest'

import { mergeConfigurations } from '../lib/merge'
import {
  firstOriginalConfig,
  firstImportedConfig,
  firstResultConfig,
  secondOriginalConfig,
  secondImportedConfig,
  secondResultConfig,
} from './examples'

describe('Merge configurations', () => {
  it('should be defined', () => {
    expect(mergeConfigurations).toBeDefined()
  })

  it('should merge configurations', () => {
    expect(
      mergeConfigurations(firstOriginalConfig, firstImportedConfig),
    ).toEqual(firstResultConfig)

    expect(
      mergeConfigurations(secondOriginalConfig, secondImportedConfig),
    ).toEqual(secondResultConfig)
  })
})
