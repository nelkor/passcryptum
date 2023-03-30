<script setup lang="ts">
import { ref } from 'vue'

const DELAY_TIME = 2000
const props = defineProps<{ getContent(): string }>()
const justCopied = ref(false)

const copy = () => {
  if (justCopied.value) {
    return
  }

  navigator.clipboard.writeText(props.getContent())

  justCopied.value = true

  setTimeout(() => {
    justCopied.value = false
  }, DELAY_TIME)
}
</script>

<template>
  <button type="button" :disabled="justCopied" @click="copy">
    <slot />
  </button>
</template>
