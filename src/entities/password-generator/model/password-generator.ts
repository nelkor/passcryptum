import { createCalculator } from '../lib/create-calculator'
import type { PasswordGenerator, CalculatePassword } from '../types'

const passwordGenerator: PasswordGenerator = { calculate: null }

export const calculate: CalculatePassword = (...args) => {
  if (!passwordGenerator.calculate) {
    throw new Error('Trying to calculate with an undefined calculator')
  }

  return passwordGenerator.calculate(...args)
}

export const setPasswordGenerator = async (password: string) => {
  passwordGenerator.calculate = await createCalculator(password)
}

export const clearPasswordGenerator = () => {
  passwordGenerator.calculate = null
}
