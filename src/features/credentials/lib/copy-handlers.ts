import { ServiceData } from '#/services'

import { writeToClipboard } from '@/shared'

import {
  lastCopiedLogin,
  clearLastCopiedLogin,
  showCredentialsModal,
} from '../model'
import { writePasswordToClipboard } from './copy-password'

const getMultipleAccounts = (service: ServiceData) => {
  const { length } = service.logins

  if (!length) {
    throw new Error('No login to copy')
  }

  return length > 1
}

export const copyLogin = (service: ServiceData) => {
  if (getMultipleAccounts(service)) {
    showCredentialsModal(service, false)

    return false
  }

  writeToClipboard(service.logins[0].name)

  return true
}

export const copyPassword = (service: ServiceData) => {
  if (getMultipleAccounts(service)) {
    const login = service.logins.find(({ name }) => name === lastCopiedLogin)

    if (login) {
      clearLastCopiedLogin()
      writePasswordToClipboard(service, login)

      return true
    }

    showCredentialsModal(service, true)

    return false
  }

  writePasswordToClipboard(service, service.logins[0])

  return true
}
