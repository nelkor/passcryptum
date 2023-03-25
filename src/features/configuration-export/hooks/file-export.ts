import { ref, computed } from 'vue'

import { isConfigEmpty } from '@/entities/services-config'
import { getMasterTool } from '@/entities/master-tool'

import { getEncryptedConfig } from '../lib/get-encrypted-config'

const BINARY_MIME_TYPE = 'application/octet-stream'

export const useFileExport = () => {
  const { shortHash } = getMasterTool()
  const linkElement = document.createElement('a')
  const encryptionInProgress = ref(false)

  const isExportDisabled = computed(
    () => isConfigEmpty.value || encryptionInProgress.value
  )

  const onClick = async () => {
    encryptionInProgress.value = true

    const encryptedConfigBuffer = await getEncryptedConfig()

    encryptionInProgress.value = false

    const blob = new Blob([encryptedConfigBuffer], { type: BINARY_MIME_TYPE })

    linkElement.href = URL.createObjectURL(blob)
    linkElement.download = `${shortHash.slice(0, 6)}.dat`

    linkElement.click()
  }

  return {
    isExportDisabled,
    onClick,
  }
}
