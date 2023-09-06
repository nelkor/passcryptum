<script setup lang="ts">
import { getDataAsBuffer } from '#/core'
import { NButton, useLoadingBar } from 'naive-ui'
import { DownloadOutline } from '@vicons/ionicons5'

import { sessionId, areServicesEmpty } from '@/entities/session'

const loadingBar = useLoadingBar()
const linkElement = document.createElement('a')
const BINARY_MIME_TYPE = 'application/octet-stream'

const onClick = async () => {
  loadingBar.start()

  const buffer = await getDataAsBuffer()

  if (!buffer) {
    throw new Error('Empty buffer when downloading a file')
  }

  const blob = new Blob([buffer], { type: BINARY_MIME_TYPE })

  linkElement.href = URL.createObjectURL(blob)
  linkElement.download = `${sessionId.value}.dat`

  linkElement.click()
  loadingBar.finish()
}
</script>

<template>
  <NButton
    strong
    tertiary
    size="large"
    type="primary"
    :disabled="areServicesEmpty"
    @click="onClick"
  >
    <template #icon>
      <DownloadOutline />
    </template>

    Download file
  </NButton>
</template>
