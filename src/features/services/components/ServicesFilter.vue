<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'

import { createElementRef } from '@/shared'

import { filterSubstring, clearFilterSubstring } from '../model'

const inputElement = createElementRef<HTMLInputElement>()

const keydownListener = (event: KeyboardEvent) => {
  if (event.altKey && event.code === 'KeyS') {
    event.preventDefault()
    inputElement.value.focus()
  }
}

onMounted(() => {
  addEventListener('keydown', keydownListener)
})

onBeforeUnmount(() => {
  removeEventListener('keydown', keydownListener)
})
</script>

<template>
  <input
    ref="inputElement"
    v-model="filterSubstring"
    type="text"
    placeholder="Filter by name"
    @keydown.esc="clearFilterSubstring"
  />
</template>
