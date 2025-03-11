import axios from 'axios'
import { base64ToBuffer, uint8ArrayToBase64, generateTimestamp } from '#/core'

import {
  LS_KEY_PIN,
  LS_KEY_PROTECTOR,
  LS_KEY_PUBLIC_KEY,
} from '../../constants'
import { getHashOfString } from '../../shared'

const validateEncryptedHash = (hash: string): boolean =>
  hash.length === 364 && /^[A-Za-z0-9+/=]+$/.test(hash)

export const getEncryptedHash = (): string | null => {
  const hash = localStorage.getItem(LS_KEY_PIN)

  if (!hash || !validateEncryptedHash(hash)) {
    localStorage.removeItem(LS_KEY_PIN)

    return null
  }

  return hash
}

export const getEncryptedOnlineHash = async (pin: string) => {
  const publicKey = localStorage.getItem(LS_KEY_PUBLIC_KEY)
  const protector = localStorage.getItem(LS_KEY_PROTECTOR)
  const hashedPin = await getHashOfString(pin)
  const timestamp = generateTimestamp()

  try {
    const response = await axios.get(
      'https://passcryptum.ddns.net/api/credentials/',
      // 'http://127.0.0.1:8000/api/credentials/',
      {
        headers: {
          'Content-Type': 'application/json',
          'Public-Key': publicKey,
          'Hashed-Pin': uint8ArrayToBase64(hashedPin),
          'Protector': protector,
          'Timestamp': uint8ArrayToBase64(timestamp),
        },
      },
    )

    if (response.status === 200) {
      return base64ToBuffer(response.data)
    }

    throw new Error('Unexpected response status')
  } catch (e) {
    void e

    throw new Error('Getting online PIN failed')
  }
}
