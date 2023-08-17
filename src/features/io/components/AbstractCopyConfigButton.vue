<script setup lang="ts">
import { ref } from 'vue'

import { CopyButton } from '@/shared'

import { useExportDisable } from '../hooks/export-disable'

const props = defineProps<{ getData(): Promise<null | string> }>()
const dataInProgress = ref(false)
const { isExportDisabled } = useExportDisable(dataInProgress)

const getContent = async () => {
  dataInProgress.value = true

  const data = await props.getData()

  dataInProgress.value = false

  return data || ''
}
</script>

<template>
  <CopyButton :disabled="isExportDisabled" :get-content="getContent">
    <slot />
  </CopyButton>
</template>
