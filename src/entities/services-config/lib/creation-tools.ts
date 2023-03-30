import type { ServicesConfig, ServiceData } from '../types'

export const createEmptyConfig = (): ServicesConfig => ({
  popular: [],
  custom: [],
})

export const createService = (name: string): ServiceData => ({
  name,
  useSpecialCharacters: true,
  passwordLengthIndex: 2,
  logins: [],
})
