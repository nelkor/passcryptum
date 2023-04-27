<script setup lang="ts">
import { nameSubstring } from '../model/services-filter'
import { useHotkeyFocus } from '../hooks/hotkey-focus'

const { inputElement } = useHotkeyFocus()
</script>

<template>
  <input
    ref="inputElement"
    v-model="nameSubstring"
    type="text"
    placeholder="Filter by name"
  />
</template>
