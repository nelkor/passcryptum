import { compressedConfigText } from '@/entities/services-config'
import { stringifyBuffer } from '@/shared'

import { getEncryptedConfig } from '../lib/get-encrypted-config'

export const getConfigText = async (withoutEncryption = false) =>
  withoutEncryption
    ? compressedConfigText.value
    : stringifyBuffer(await getEncryptedConfig())
