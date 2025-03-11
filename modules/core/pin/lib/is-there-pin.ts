import {
  LS_KEY_PROTECTOR,
  LS_KEY_PUBLIC_KEY,
  // LS_KEY_RANDOM_STRING,
} from '../../constants'
import { getEncryptedHash } from '../../actions'

export const isThereOfflinePin = (): boolean => Boolean(getEncryptedHash())

export const isThereOnlinePin = (): boolean => {
  const publicKey = localStorage.getItem(LS_KEY_PUBLIC_KEY)
  const protector = localStorage.getItem(LS_KEY_PROTECTOR)
  // const randomString = localStorage.getItem(LS_KEY_RANDOM_STRING)

  return Boolean(publicKey && protector)
  // return Boolean(publicKey && protector && randomString)
}

export const isTherePin = (): boolean =>
  isThereOfflinePin() || isThereOnlinePin()
