import { computed, ref } from 'vue'

import {
  getCompressedConfigText,
  isConfigEmpty,
} from '@/entities/services-config'
import { stringifyBuffer } from '@/shared'

import { getEncryptedConfig } from '../lib/get-encrypted-config'

export const useClipboardCopy = (withoutEncryption = false) => {
  const exportInProgress = ref(false)

  const isCopyDisabled = computed(
    () => isConfigEmpty.value || exportInProgress.value
  )

  const onClick = async () => {
    exportInProgress.value = true

    await navigator.clipboard.writeText(
      withoutEncryption
        ? getCompressedConfigText()
        : stringifyBuffer(await getEncryptedConfig())
    )

    exportInProgress.value = false
  }

  return {
    isCopyDisabled,
    onClick,
  }
}
