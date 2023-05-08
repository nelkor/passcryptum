<script setup lang="ts">
import { computed } from 'vue'

import type { ServiceData } from '@/entities/services-config'
import { CopyButton } from '@/shared'

import { useServiceItem } from '../hooks/service-item'

const props = defineProps<{ service: ServiceData }>()

const {
  logins,
  currentLogin,
  isSelectDisabled,
  isCopyDisabled,
  openDetails,
  getLogin,
  getPassword,
} = useServiceItem(computed(() => props.service))
</script>

<template>
  <li>
    <span>{{ service.name }}</span>

    <select v-model="currentLogin" :disabled="isSelectDisabled">
      <option v-for="login in logins" :key="login" :value="login">
        {{ login }}
      </option>
    </select>

    <CopyButton :disabled="isCopyDisabled" :get-content="getLogin">
      Copy login
    </CopyButton>

    <CopyButton :disabled="isCopyDisabled" :get-content="getPassword">
      Copy password
    </CopyButton>

    <button @click="openDetails">Details</button>
  </li>
</template>
