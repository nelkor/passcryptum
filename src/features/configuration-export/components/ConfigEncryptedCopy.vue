<script setup lang="ts">
import { useClipboardCopy } from '../hooks/clipboard-copy'

const { isCopyDisabled, onClick } = useClipboardCopy()
</script>

<template>
  <button :disabled="isCopyDisabled" @click="onClick">Copy config</button>
</template>
