<script setup lang="ts">
import { ServicesFilter, filteredServices } from '@/features/services-filter'

import { useServiceHeader } from '../hooks/service-header'

const { startServiceCreation } = useServiceHeader()
</script>

<template>
  <div class="services-title">
    <h1 class="services-title__text">My services</h1>
    <span class="services-title__count">({{ filteredServices.length }})</span>
  </div>

  <div class="services-controls">
    <ServicesFilter />

    <button class="services-controls__add" @click="startServiceCreation">
      Add a service
    </button>
  </div>
</template>
