import { decompressConfig } from '@/entities/services-config'

export const parseConfig = (text: string) => {
  try {
    return decompressConfig(JSON.parse(text))
  } catch (e) {
    return null
  }
}
