<script setup lang="ts">
import type { ServiceData } from '@/entities/services-config'

import LoginItem from './LoginItem.vue'

defineProps<{ service: ServiceData }>()
</script>

<template>
  <ul>
    <li v-for="login in service.logins" :key="login.name">
      <LoginItem :service="service" :login="login" />
    </li>
  </ul>
</template>
