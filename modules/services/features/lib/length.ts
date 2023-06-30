import { PasswordLengthIndex } from '../../types'

export const passwordLengthVariants = [8, 12, 20, 32]

export const getPasswordLengthByIndex = (index: PasswordLengthIndex) =>
  passwordLengthVariants[index]
