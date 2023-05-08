<script setup lang="ts">
import { isConfigSaved, cancelChanges } from '@/entities/services-config'

import { useSaveChanges } from '../hooks/save-changes'

const { isSaveDisabled, saveChanges } = useSaveChanges()
</script>

<template>
  <button :disabled="isSaveDisabled" @click="saveChanges">
    Save configuration
  </button>
  |
  <button :disabled="isConfigSaved" @click="cancelChanges">
    Cancel changes
  </button>
</template>
