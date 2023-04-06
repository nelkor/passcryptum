<script setup lang="ts">
import { updateServicePreferences } from '@/entities/services-config'
import type { ServiceData } from '@/entities/services-config'
import { CopyButton } from '@/shared'

import { useServiceDeleting } from '../hooks/service-deleting'
import ServicePreferences from './ServicePreferences.vue'
import LoginAdder from './LoginAdder.vue'
import LoginsList from './LoginsList.vue'

const props = defineProps<{ service: ServiceData }>()
const getServiceName = () => props.service.name
const { rmService } = useServiceDeleting(getServiceName)
</script>

<template>
  <li class="service-item">
    <div class="service-item-header">
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
      @update-preferences="updateServicePreferences"
    />

    <hr />
    <LoginAdder :service="service" />
    <LoginsList :service="service" />
  </li>
</template>
