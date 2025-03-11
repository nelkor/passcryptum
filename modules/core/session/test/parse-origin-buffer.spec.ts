import { webcrypto } from 'crypto'

import { describe, it, expect } from 'vitest'

import { parseOriginBuffer } from '../lib/parse-origin-buffer'
// import { pbkdf2, getBufferOfText, stringifyBuffer } from '../../shared'
import { pbkdf2, getBufferOfText } from '../../shared'

Object.defineProperty(global, 'crypto', { value: webcrypto })

describe('Parse origin buffer', () => {
  it('should be defined', () => {
    expect(parseOriginBuffer).toBeDefined()
  })

  it('should parse buffer', async () => {
    // const { id, lsKey, iv, entropy } = parseOriginBuffer(
    const { id, lsKey } = parseOriginBuffer(
      await pbkdf2(getBufferOfText('very good password'), 128, 16),
    )

    expect(id).toBe('WONT')
    expect(lsKey).toBe('33854fec786f106d')
    // expect(stringifyBuffer(iv)).toBe('a15ecc0fcaffca995142651f25db40f3')

    // expect(stringifyBuffer(entropy)).toBe(
    //   [
    //     '8bd4132be7fa82c30ad4198044045f0a125c',
    //     '05853689a89824b8228c9a34ac84267ca35e',
    //     '31d8d3cfd57c7c56754e7704c68394ef06d8',
    //     'cec66e0443a0672ec6882f5afdc26fbd6533',
    //   ].join(''),
    // )
  })
})
