import { decryptHex } from '@/entities/master-tool'

import { parseConfig } from './parse-config'
import { setConfiguration } from './set-configuration'

export const importAsIs = async (text: string) => {
  const parsedAsIs = parseConfig(text)

  if (parsedAsIs) {
    await setConfiguration(parsedAsIs)

    return true
  }

  return false
}

export const importText = async (text: string) => {
  if (await importAsIs(text)) {
    return true
  }

  const decryptedText = await decryptHex(text)

  const parsedAsEncrypted = parseConfig(decryptedText)

  if (parsedAsEncrypted) {
    await setConfiguration(parsedAsEncrypted)

    return true
  }

  return false
}
