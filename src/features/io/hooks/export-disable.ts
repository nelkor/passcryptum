import { computed, Ref } from 'vue'

import { areServicesEmpty } from '@/entities/session'

export const useExportDisable = (inProgress: Ref<boolean>) => ({
  isExportDisabled: computed(() => areServicesEmpty.value || inProgress.value),
})
