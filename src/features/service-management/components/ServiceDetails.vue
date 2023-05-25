<script setup lang="ts">
import { computed } from 'vue'

import type { ServiceData } from '@/entities/services-config'

import { provideService } from '../providers/service'
import { useServiceDetails } from '../hooks/service-details'
import ServicePreferences from './ServicePreferences.vue'
import LoginItem from './LoginItem.vue'

const props = defineProps<{ service: ServiceData }>()

const { deleteService, startLoginCreation } = useServiceDetails(
  provideService(computed(() => props.service))
)
</script>

<template>
  <button
    class="app-button app-button__delete in-block-element"
    @click="deleteService"
  >
    Delete service
  </button>

  <button
    class="app-button app-button__important in-block-element"
    @click="startLoginCreation"
  >
    Add a login
  </button>

  <ServicePreferences />

  <h4 class="service-details-logins-title">
    {{ service.logins.length ? 'Logins' : 'No logins here yet' }}
  </h4>

  <ul>
    <LoginItem
      v-for="login in service.logins"
      :key="login.name"
      :login="login"
    />
  </ul>
</template>
