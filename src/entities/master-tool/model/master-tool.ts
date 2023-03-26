import { ref, computed } from 'vue'

import { createMasterTool } from '../lib/create-master-tool'
import type { MasterTool } from '../types'

const masterTool = ref<MasterTool | null>(null)

export const isMasterEntered = computed(() => Boolean(masterTool.value))

export const setMasterPassword = async (password: string) => {
  masterTool.value = await createMasterTool(password)
}

export const clearMasterPassword = () => {
  masterTool.value = null
}

export const getMasterTool = (): MasterTool => {
  if (!masterTool.value) {
    throw new Error('Trying to get an undefined MasterTool')
  }

  return masterTool.value
}
