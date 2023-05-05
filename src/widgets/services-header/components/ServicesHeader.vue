<script setup lang="ts">
import { ServicesFilter, filteredServices } from '@/features/services-filter'

import { useServiceHeader } from '../hooks/service-header'

const { startServiceCreation } = useServiceHeader()
</script>

<template>
  <div class="services-header">
    <div class="services-header__title">
      <h1>My services</h1>
      <span>({{ filteredServices.length }})</span>
    </div>

    <div class="services-header__controls">
      <ServicesFilter />
      <button @click="startServiceCreation">Add a service</button>
    </div>
  </div>
</template>
