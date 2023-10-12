<script setup lang="ts">
import ExternalLink from './ExternalLink.vue'

defineProps<{ path: string }>()
</script>

<template>
  <ExternalLink :url="`github.com/nelkor/passcryptum${path}`">
    <slot />
  </ExternalLink>
</template>
