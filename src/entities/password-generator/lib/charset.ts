const basicCharset = [
  '0123456789',
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  'abcdefghijklmnopqrstuvwxyz',
]

const specialSymbols = '`!@#$%^&*()-_=+{[]};:"|/.,<>'

export const getCharset = (useSpecialCharacters: boolean) => [
  ...basicCharset,
  ...(useSpecialCharacters ? [specialSymbols] : []),
]
