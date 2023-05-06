<script setup lang="ts">
import { ServicesFilter, filteredServices } from '@/features/services-filter'

import { useServiceHeader } from '../hooks/service-header'

const { startServiceCreation } = useServiceHeader()
</script>

<template>
  <div>
    <h1>My services</h1>
    <span>({{ filteredServices.length }})</span>
  </div>

  <div>
    <ServicesFilter />
    <button @click="startServiceCreation">Add a service</button>
  </div>
</template>
