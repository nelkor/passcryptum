import type { ServicesConfig, CompressedConfig } from '../types'

export const emptyConfig: ServicesConfig = {
  popular: [],
  custom: [],
}

export const emptyCompressed: CompressedConfig = [{}, {}]

export const filledConfig: ServicesConfig = {
  popular: [
    {
      name: 'google',
      useSpecialCharacters: true,
      passwordLengthIndex: 2,
      logins: [
        {
          name: 'nelkor@gmail.com',
          version: 1,
        },
        {
          name: 'fake-nelkor@gmail.com',
          version: 1,
        },
      ],
    },
    {
      name: 'netflix',
      useSpecialCharacters: false,
      passwordLengthIndex: 3,
      logins: [
        {
          name: 'nelkor',
          version: 2,
        },
      ],
    },
  ],
  custom: [
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
  ],
}

export const filledCompressed: CompressedConfig = [
  {
    google: {
      'nelkor@gmail.com': 1,
      'fake-nelkor@gmail.com': 1,
    },
    netflix: [6, { nelkor: 2 }],
  },
  {
    'github.com': [7, { nelkor: 3 }],
  },
]
