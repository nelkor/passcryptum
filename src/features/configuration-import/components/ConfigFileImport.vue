<script setup lang="ts">
import { useFileImport } from '../hooks/file-import'

const { isButtonDisabled, onClick } = useFileImport()
</script>

<template>
  <button
    class="app-button app-button__common"
    :disabled="isButtonDisabled"
    @click="onClick"
  >
    Import from file
  </button>
</template>
