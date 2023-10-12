<script setup lang="ts">
import { ref } from 'vue'
import { NButton, useMessage } from 'naive-ui'
import { CopyOutline } from '@vicons/ionicons5'

import { COPY_DELAY_TIME } from '@/shared'

import { writeToClipboard } from '../lib/clipboard'

const message = useMessage()
const justCopied = ref(false)
const props = defineProps<{ getContent(): string | Promise<string> }>()

const copy = () => {
  if (justCopied.value) {
    return
  }

  justCopied.value = true

  writeToClipboard(props.getContent())

  setTimeout(() => {
    justCopied.value = false

    message.info('In your clipboard')
  }, COPY_DELAY_TIME)
}
</script>

<template>
  <NButton :loading="justCopied" v-bind="$attrs" @click="copy">
    <template #icon>
      <CopyOutline />
    </template>

    <slot />
  </NButton>
</template>
