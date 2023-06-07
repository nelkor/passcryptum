<script setup lang="ts">
defineProps<{
  url: string
  text: string
}>()
</script>

<template>
  <a :href="`https://${url}`" target="_blank" rel="noopener noreferrer">
    {{ text }}
  </a>
</template>
