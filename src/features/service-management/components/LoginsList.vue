<script setup lang="ts">
import type { ServiceData } from '@/entities/services-config'

import LoginItem from './LoginItem.vue'

defineProps<{ service: ServiceData }>()
</script>

<template>
  <ul>
    <LoginItem
      v-for="login in service.logins"
      :key="login.name"
      :service="service"
      :login="login"
    />
  </ul>
</template>
