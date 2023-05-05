<script setup lang="ts">
import { nameSubstring, clearNameSubstring } from '../model/services-filter'
import { useHotkeyFocus } from '../hooks/hotkey-focus'

const { inputElement } = useHotkeyFocus()
</script>

<template>
  <input
    ref="inputElement"
    v-model="nameSubstring"
    type="text"
    placeholder="Filter by name"
    @keydown.esc="clearNameSubstring"
  />
</template>
