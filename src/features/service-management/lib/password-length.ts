export const passwordLengthVariants = [8, 12, 20, 32]

export const getPasswordLengthByIndex = (index: number) => {
  const length = passwordLengthVariants[index]

  if (!length) {
    throw new Error('Invalid password length')
  }

  return length
}
