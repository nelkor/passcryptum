import type { CompressedConfig } from '@/entities/services-config'

const isLogins = (data: Record<string, unknown>) =>
  Object.values(data).every(value => Number.isFinite(value))

const isCompressedServiceData = (data: unknown) => {
  if (Array.isArray(data) && data.length === 2) {
    const [options, logins] = data

    return [0, 1, 2, 3, 4, 6, 7].includes(options) && isLogins(logins)
  }

  if (typeof data === 'object') {
    return isLogins(data as Record<string, unknown>)
  }

  return false
}

export const checkCompressed = (data: unknown): data is CompressedConfig =>
  Boolean(
    data &&
      typeof data === 'object' &&
      Object.values(data).every(isCompressedServiceData)
  )
