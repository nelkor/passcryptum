<script setup lang="ts">
defineProps<{
  path: string
  text: string
}>()
</script>

<template>
  <a
    :href="`https://github.com/nelkor/passcryptum${path}`"
    target="_blank"
    rel="noopener noreferrer"
  >
    {{ text }}
  </a>
</template>
