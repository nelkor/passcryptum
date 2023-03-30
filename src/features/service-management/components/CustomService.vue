<script setup lang="ts">
import { updateCustomServicePreferences } from '@/entities/services-config'
import type { ServiceData } from '@/entities/services-config'
import { CopyButton } from '@/shared'

import { useCustomService } from '../hooks/custom-service'
import ServicePreferences from './ServicePreferences.vue'

const props = defineProps<{ service: ServiceData }>()
const getServiceName = () => props.service.name
const { rmService } = useCustomService(getServiceName)
</script>

<template>
  <div class="custom-service">
    <div class="custom-service-header">
      <h4>{{ service.name }}</h4>

      <div class="buttons">
        <CopyButton :get-content="getServiceName">Copy service name</CopyButton>
        |
        <button @click="rmService">Delete service</button>
      </div>
    </div>

    <hr />

    <ServicePreferences
      :service="service"
      @update-preferences="updateCustomServicePreferences"
    />
  </div>
</template>
