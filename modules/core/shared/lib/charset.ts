export const capitals = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

const basicCharset = [capitals, 'abcdefghijklmnopqrstuvwxyz', '0123456789']
const specialSymbols = '`!@#$%^&*()-_=+{[]};:"|/.,<>'

export const getCharset = (useSpecialCharacters: boolean) => [
  ...basicCharset,
  ...(useSpecialCharacters ? [specialSymbols] : []),
]
