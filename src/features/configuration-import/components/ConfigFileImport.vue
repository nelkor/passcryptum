<script setup lang="ts">
import { useFileImport } from '../hooks/file-import'

const { isButtonDisabled, onClick } = useFileImport()
</script>

<template>
  <button :disabled="isButtonDisabled" @click="onClick">
    Import from file
  </button>
</template>
