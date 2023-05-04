import type { ServicesConfig, CompressedConfig } from '../types'

export const emptyConfig: ServicesConfig = []

export const emptyCompressed: CompressedConfig = {}

export const filledConfig: ServicesConfig = [
  {
    name: 'github.com',
    useSpecialCharacters: true,
    passwordLengthIndex: 3,
    logins: [
      {
        name: 'nelkor',
        version: 3,
      },
    ],
  },
]

export const filledCompressed: CompressedConfig = {
  'github.com': [7, { nelkor: 3 }],
}
