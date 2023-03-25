<script setup lang="ts">
import { useClipboardCopy } from '../hooks/clipboard-copy'

const { isCopyDisabled, onClick } = useClipboardCopy(true)
</script>

<template>
  <button :disabled="isCopyDisabled" @click="onClick">
    Copy without encryption
  </button>
</template>
