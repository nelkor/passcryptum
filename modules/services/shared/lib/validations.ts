import { PasswordLengthIndex } from '../../types'

export const isValidPasswordLengthIndex = (
  index: number,
): index is PasswordLengthIndex => [0, 1, 2, 3].includes(index)
