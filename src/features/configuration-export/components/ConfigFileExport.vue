<script setup lang="ts">
import { useFileExport } from '../hooks/file-export'

const { onClick, isExportDisabled } = useFileExport()
</script>

<template>
  <button :disabled="isExportDisabled" @click="onClick">Download file</button>
</template>
