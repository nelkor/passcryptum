<script setup lang="ts">
import { isConfigEmpty } from '@/entities/services-config'

import { useDelete } from '../hooks/delete-config'

const { onClick } = useDelete()
</script>

<template>
  <button
    class="app-button app-button__delete"
    :disabled="isConfigEmpty"
    @click="onClick"
  >
    Delete configuration
  </button>
</template>
