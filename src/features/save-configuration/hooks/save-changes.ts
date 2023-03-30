import { ref, computed } from 'vue'

import {
  compressedConfigText,
  isConfigSaved,
  saveConfig,
} from '@/entities/services-config'
import { getMasterTool } from '@/entities/master-tool'
import { encrypt, getBufferOfText, stringifyBuffer } from '@/shared'

export const useSaveChanges = () => {
  const encryptionInProgress = ref(false)

  const isSaveDisabled = computed(
    () => isConfigSaved.value || encryptionInProgress.value
  )

  const saveChanges = async () => {
    saveConfig()

    const { shortHash, key, iv } = getMasterTool()
    const compressedConfigBuffer = getBufferOfText(compressedConfigText.value)

    encryptionInProgress.value = true

    const encryptedConfigBuffer = await encrypt(compressedConfigBuffer, key, iv)

    encryptionInProgress.value = false

    localStorage.setItem(shortHash, stringifyBuffer(encryptedConfigBuffer))
  }

  return {
    isSaveDisabled,
    saveChanges,
  }
}
