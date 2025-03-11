import axios from 'axios'
import { uint8ArrayToBase64, generateTimestamp } from '#/core'

import {
  LS_KEY_PIN,
  LS_KEY_PROTECTOR,
  LS_KEY_PUBLIC_KEY,
  // LS_KEY_RANDOM_STRING,
} from '../../constants'

export const deleteOfflinePin = () => localStorage.removeItem(LS_KEY_PIN)

export const deleteOnlinePin = async () => {
  const publicKey = localStorage.getItem(LS_KEY_PUBLIC_KEY)
  const protector = localStorage.getItem(LS_KEY_PROTECTOR)
  const timestamp = generateTimestamp()

  try {
    const response = await axios.delete(
      'https://passcryptum.ddns.net/api/credentials/',
      // 'http://127.0.0.1:8000/api/credentials/',
      {
        headers: {
          'Content-Type': 'application/json',
          'Public-Key': publicKey,
          'Protector': protector,
          'Timestamp': uint8ArrayToBase64(timestamp),
        },
      },
    )

    if (response.status === 200) {
      localStorage.removeItem(LS_KEY_PROTECTOR)
      localStorage.removeItem(LS_KEY_PUBLIC_KEY)
      // localStorage.removeItem(LS_KEY_RANDOM_STRING)
    } else {
      throw new Error('Unexpected response status')
    }
  } catch (e) {
    void e

    throw new Error('Deleting online PIN failed')
  }
}
