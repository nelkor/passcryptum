<script setup lang="ts">
import { isConfigEmpty } from '@/entities/services-config'

import { useDelete } from '../hooks/delete-config'

const { onClick } = useDelete()
</script>

<template>
  <button :disabled="isConfigEmpty" @click="onClick">
    Delete configuration
  </button>
</template>
