<script setup lang="ts">
import { ServiceAdder, ServiceItem } from '@/features/service-management'
import { ServicesFilter, filteredServices } from '@/features/services-filter'
</script>

<template>
  <div class="services-list">
    <div class="services-list__head">
      <h3 class="services-list__title">Services</h3>
      <ServicesFilter />
    </div>

    <hr />
    <ServiceAdder />
    <hr />

    <ul>
      <ServiceItem
        v-for="service in filteredServices"
        :key="service.name"
        :service="service"
      />
    </ul>
  </div>
</template>
