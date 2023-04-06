<script setup lang="ts">
import { servicesConfig } from '@/entities/services-config'
import { ServiceAdder, ServiceItem } from '@/features/service-management'
</script>

<template>
  <div class="services-list">
    <h3>Services</h3>
    <hr />
    <ServiceAdder />
    <hr />

    <ul>
      <ServiceItem
        v-for="service in servicesConfig"
        :key="service.name"
        :service="service"
      />
    </ul>
  </div>
</template>
