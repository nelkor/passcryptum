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
