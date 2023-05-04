import type { ServicesConfig } from '@/entities/services-config'

export const firstOriginalConfig: ServicesConfig = [
  {
    name: 'google.com',
    useSpecialCharacters: false,
    passwordLengthIndex: 3,
    logins: [
      {
        name: 'nelkor4958124343@gmail.com',
        version: 1,
      },
    ],
  },
  {
    name: 'vk.com',
    useSpecialCharacters: true,
    passwordLengthIndex: 2,
    logins: [
      {
        name: '+74958124343',
        version: 1,
      },
      {
        name: '+74956775917',
        version: 2,
      },
    ],
  },
]

export const firstImportedConfig: ServicesConfig = [
  {
    name: 'netflix.com',
    useSpecialCharacters: true,
    passwordLengthIndex: 1,
    logins: [
      {
        name: 'nelkor',
        version: 1,
      },
    ],
  },
  {
    name: 'vk.com',
    useSpecialCharacters: true,
    passwordLengthIndex: 2,
    logins: [
      {
        name: '+74952050011',
        version: 1,
      },
      {
        name: '+74956775917',
        version: 1,
      },
    ],
  },
]

export const firstResultConfig: ServicesConfig = [
  {
    name: 'netflix.com',
    useSpecialCharacters: true,
    passwordLengthIndex: 1,
    logins: [
      {
        name: 'nelkor',
        version: 1,
      },
    ],
  },
  {
    name: 'google.com',
    useSpecialCharacters: false,
    passwordLengthIndex: 3,
    logins: [
      {
        name: 'nelkor4958124343@gmail.com',
        version: 1,
      },
    ],
  },
  {
    name: 'vk.com',
    useSpecialCharacters: true,
    passwordLengthIndex: 2,
    logins: [
      {
        name: '+74952050011',
        version: 1,
      },
      {
        name: '+74958124343',
        version: 1,
      },
      {
        name: '+74956775917',
        version: 2,
      },
    ],
  },
]

export const secondOriginalConfig: ServicesConfig = [
  {
    name: 'GitHub',
    useSpecialCharacters: true,
    passwordLengthIndex: 0,
    logins: [
      {
        name: 'VladislavBobyrev',
        version: 2,
      },
    ],
  },
]

export const secondImportedConfig: ServicesConfig = [
  {
    name: 'GitHub',
    useSpecialCharacters: false,
    passwordLengthIndex: 3,
    logins: [
      {
        name: 'VladislavBobyrev',
        version: 1,
      },
    ],
  },
]

export const secondResultConfig: ServicesConfig = [
  {
    name: 'GitHub',
    useSpecialCharacters: false,
    passwordLengthIndex: 3,
    logins: [
      {
        name: 'VladislavBobyrev',
        version: 2,
      },
    ],
  },
]
