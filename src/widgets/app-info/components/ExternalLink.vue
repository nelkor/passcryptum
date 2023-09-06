<script setup lang="ts">
import { NA } from 'naive-ui'

defineProps<{ url: string }>()
</script>

<template>
  <NA :href="`https://${url}`" target="_blank" rel="noopener noreferrer">
    <slot />
  </NA>
</template>
