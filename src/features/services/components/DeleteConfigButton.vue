<script setup lang="ts">
import { clearServices, areServicesEmpty } from '@/entities/session'

const onClick = () => {
  if (confirm('Are you sure you want to delete all the services?')) {
    clearServices()
  }
}
</script>

<template>
  <button :disabled="areServicesEmpty" @click="onClick">Delete config</button>
</template>
