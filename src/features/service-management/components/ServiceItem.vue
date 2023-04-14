<script setup lang="ts">
import { computed } from 'vue'

import { updateServicePreferences } from '@/entities/services-config'
import type { ServiceData } from '@/entities/services-config'
import { CopyButton } from '@/shared'

import { useServiceDeleting } from '../hooks/service-deleting'
import { provideService } from '../providers/service'
import ServicePreferences from './ServicePreferences.vue'
import LoginAdder from './LoginAdder.vue'
import LoginsList from './LoginsList.vue'

const props = defineProps<{ service: ServiceData }>()
const service = provideService(computed(() => props.service))
const getServiceName = () => service.value.name
const { rmService } = useServiceDeleting(getServiceName)
</script>

<template>
  <li class="service-item">
    <div class="service-item__header">
      <h4 class="service-item__name">{{ service.name }}</h4>

      <div>
        <CopyButton :get-content="getServiceName">Copy service name</CopyButton>
        |
        <button @click="rmService">Delete service</button>
      </div>
    </div>

    <hr />
    <ServicePreferences @update-preferences="updateServicePreferences" />
    <hr />
    <LoginAdder />
    <LoginsList />
  </li>
</template>
