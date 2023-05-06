<script setup lang="ts">
import { computed } from 'vue'

import { updateServicePreferences } from '@/entities/services-config'
import type { ServiceData } from '@/entities/services-config'

import { provideService } from '../providers/service'
import { useServiceDetails } from '../hooks/service-details'
import ServicePreferences from './ServicePreferences.vue'
import LoginItem from './LoginItem.vue'

const props = defineProps<{ service: ServiceData }>()
const service = provideService(computed(() => props.service))
const { deleteService, startLoginCreation } = useServiceDetails(service)
</script>

<template>
  <button @click="deleteService">Delete service</button>
  <hr />
  <ServicePreferences @update-preferences="updateServicePreferences" />
  <button class="aside__input" @click="startLoginCreation">Add a login</button>

  <ul>
    <LoginItem
      v-for="login in service.logins"
      :key="login.name"
      :login="login"
    />
  </ul>
</template>
