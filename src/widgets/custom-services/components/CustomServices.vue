<script setup lang="ts">
import { AddCustomService } from '@/features/add-custom-service'
import { customServices } from '@/entities/services-config'

import CustomService from './CustomService.vue'
</script>

<template>
  <div class="custom-services">
    <h3>Custom services</h3>
    <hr />
    <AddCustomService />
    <hr />

    <CustomService
      v-for="service in customServices"
      :key="service.name"
      :name="service.name"
    />
  </div>
</template>
