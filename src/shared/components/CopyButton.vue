<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  getContent(): string | Promise<string>
  disabled?: boolean
}>()

const DELAY_TIME = 2000
const type = 'text/plain'
const justCopied = ref(false)

const polyfillCopy = async () =>
  navigator.clipboard.writeText(await props.getContent())

const copy = () => {
  if (!document.hasFocus() || justCopied.value) {
    return
  }

  if ('ClipboardItem' in window) {
    const clipboardItem = new ClipboardItem({
      [type]: Promise.resolve()
        .then(props.getContent)
        .then(result => new Blob([result], { type })),
    })

    navigator.clipboard.write([clipboardItem])
  } else {
    polyfillCopy()
  }

  justCopied.value = true

  setTimeout(() => {
    justCopied.value = false
  }, DELAY_TIME)
}
</script>

<template>
  <button type="button" :disabled="disabled || justCopied" @click="copy">
    <slot />
  </button>
</template>
