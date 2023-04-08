import type { ComputedRef } from 'vue'

import { useProvider } from '@/shared'
import type { ServiceData } from '@/entities/services-config'

export const [provideService, injectService] =
  useProvider<ComputedRef<ServiceData>>()
