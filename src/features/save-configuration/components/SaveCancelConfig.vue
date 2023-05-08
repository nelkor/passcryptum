<script setup lang="ts">
import { isConfigSaved, cancelChanges } from '@/entities/services-config'

import { useSaveChanges } from '../hooks/save-changes'

const { isSaveDisabled, saveChanges } = useSaveChanges()
</script>

<template>
  <button
    class="app-button app-button__common in-block-element"
    :disabled="isSaveDisabled"
    @click="saveChanges"
  >
    Save configuration
  </button>

  <button
    class="app-button app-button__common in-block-element"
    :disabled="isConfigSaved"
    @click="cancelChanges"
  >
    Cancel changes
  </button>
</template>
