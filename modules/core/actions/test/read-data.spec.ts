import { webcrypto } from 'crypto'

import { describe, it, expect } from 'vitest'

import { readDataByKey } from '../lib/read-data-by-key'
import { pbkdf2, getBufferOfText, createAesKey } from '../../shared'

Object.defineProperty(global, 'crypto', { value: webcrypto })

describe('Read data', () => {
  it('should be defined', () => {
    expect(readDataByKey).toBeDefined()
  })

  it('should read data from string', async () => {
    const hash = await pbkdf2(getBufferOfText('strong password'), 48, 8)

    expect(
      await readDataByKey(
        'd0cdf4785ae54db0a07f291b89f54760',
        hash.slice(32),
        await createAesKey(hash.slice(0, 32)),
      ),
    ).toBe('important data')
  })

  it('should read data from string', async () => {
    const hash = await pbkdf2(getBufferOfText('good password'), 48, 8)

    expect(
      await readDataByKey(
        new Uint16Array([
          43319, 39031, 63835, 54495, 25240, 33592, 7788, 8573, 21091, 29115,
          56658, 56141, 40275, 43640, 63728, 17797,
        ]).buffer,
        hash.slice(32),
        await createAesKey(hash.slice(0, 32)),
      ),
    ).toBe('significant data')
  })

  it('should return null if something went wrong', async () => {
    const hash = await pbkdf2(getBufferOfText('strong password'), 48, 8)
    const key = await createAesKey(hash.slice(0, 32))

    expect(await readDataByKey('1234567890', hash.slice(32), key)).toBeNull()
  })
})
