<script setup lang="ts">
import {
  ServiceItem,
  ServicesFilter,
  filteredServices,
} from '@/features/services'
</script>

<template>
  <h2 class="proto-secondary-title">
    My services ({{ filteredServices.length }})
  </h2>

  <ServicesFilter />

  <ul>
    <ServiceItem
      v-for="service in filteredServices"
      :key="service.name"
      :service="service"
    />
  </ul>
</template>
