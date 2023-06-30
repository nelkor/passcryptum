<script setup lang="ts">
import { ref } from 'vue'
import { getDataAsBuffer } from '#/core'

import { sessionId } from '@/entities/session'

import { useExportDisable } from '../hooks/export-disable'

const BINARY_MIME_TYPE = 'application/octet-stream'

const linkElement = document.createElement('a')
const downloadInProgress = ref(false)
const { isExportDisabled } = useExportDisable(downloadInProgress)

const onClick = async () => {
  downloadInProgress.value = true

  const buffer = await getDataAsBuffer()

  downloadInProgress.value = false

  if (!buffer) {
    return
  }

  const blob = new Blob([buffer], { type: BINARY_MIME_TYPE })

  linkElement.href = URL.createObjectURL(blob)
  linkElement.download = `${sessionId.value}.dat`

  linkElement.click()
}
</script>

<template>
  <button :disabled="isExportDisabled" @click="onClick">Download file</button>
</template>
