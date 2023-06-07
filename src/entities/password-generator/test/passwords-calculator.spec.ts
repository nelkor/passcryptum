import { webcrypto } from 'crypto'

import { describe, it, expect } from 'vitest'

import { createCalculator } from '../lib/create-calculator'

Object.defineProperty(global, 'crypto', { value: webcrypto })

describe('Passwords calculator', () => {
  it('should be defined', () => {
    expect(createCalculator).toBeDefined()
  })

  it('should generate passwords', async () => {
    const calculate = await createCalculator('123456')

    const [password1, password2, password3] = await Promise.all([
      calculate('GitHub', 'nelkor', 1, true, 20),
      calculate('Google', 'Vladislav', 4, false, 20),
      calculate('Netflix', 'Katerina', 3, true, 32),
    ])

    expect(password1).toBe('R`UP4gEoM9wq5#R"S47#')
    expect(password2).toBe('Ejw9b82RZoYQhqGsHRPf')
    expect(password3).toBe('ORPCa{dFzbP3j#*%nDNrn`6eI[uRoY0V')
  })
})
