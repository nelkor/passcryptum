import { LS_KEY_PIN } from '../../constants'

const validateEncryptedHash = (pin: string) =>
  pin.length === 288 && /^[0123456789abcdef]+$/.test(pin)

export const getEncryptedHash = () => {
  const hash = localStorage.getItem(LS_KEY_PIN)

  if (!hash || !validateEncryptedHash(hash)) {
    localStorage.removeItem(LS_KEY_PIN)

    return null
  }

  return hash
}
