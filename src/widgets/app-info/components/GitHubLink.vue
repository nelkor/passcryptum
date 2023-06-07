<script setup lang="ts">
import AppInfoLink from './AppInfoLink.vue'

defineProps<{
  path: string
  text: string
}>()
</script>

<template>
  <AppInfoLink :text="text" :url="`github.com/nelkor/passcryptum${path}`" />
</template>
