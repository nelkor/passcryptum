<script setup lang="ts">
import { ServiceItem } from '@/features/service-management'
import { filteredServices } from '@/features/services-filter'
</script>

<template>
  <ul>
    <ServiceItem
      v-for="service in filteredServices"
      :key="service.name"
      :service="service"
    />
  </ul>
</template>
