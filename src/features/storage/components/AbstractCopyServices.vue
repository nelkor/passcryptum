<script setup lang="ts">
import { CopyButton } from '@/shared'
import { areServicesEmpty } from '@/entities/session'

const props = defineProps<{ getData(): Promise<null | string> }>()

const getContent = async () => {
  const data = await props.getData()

  return data || ''
}
</script>

<template>
  <CopyButton
    strong
    tertiary
    size="large"
    v-bind="$attrs"
    :get-content="getContent"
    :disabled="areServicesEmpty"
  >
    <slot />
  </CopyButton>
</template>
