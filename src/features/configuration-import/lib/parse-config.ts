import { decompressConfig } from '@/entities/services-config'

import { checkCompressed } from './check-compressed'

export const parseConfig = (text: string) => {
  try {
    const data = JSON.parse(text) as unknown

    return checkCompressed(data) ? decompressConfig(data) : null
  } catch (e) {
    return null
  }
}
