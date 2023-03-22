import { webcrypto } from 'crypto'

import { describe, it, expect } from 'vitest'

import { createMasterTool } from '../lib/create-master-tool'

Object.defineProperty(global.self, 'crypto', { value: webcrypto })

describe('Create Master tool', () => {
  it('should be defined', () => {
    expect(createMasterTool).toBeDefined()
  })

  it('should generate expected hashes', async () => {
    const [first, second, third] = await Promise.all([
      createMasterTool('123456'),
      createMasterTool('qwerty1'),
      createMasterTool('dead777beef'),
    ])

    expect(first.shortHash).toEqual('690437692d902cfd23005bda16631d83')
    expect(second.shortHash).toEqual('8b6b7f158f6d43362653155ccb671d1c')
    expect(third.shortHash).toEqual('5b97a7d0424bba1b1d18e8f1c6c372b4')
  })
})
