import type { ServiceData, LoginData } from '../types'

export const createService = (name: string): ServiceData => ({
  name,
  useSpecialCharacters: true,
  passwordLengthIndex: 2,
  logins: [],
})

export const createLogin = (name: string): LoginData => ({
  name,
  version: 1,
})
