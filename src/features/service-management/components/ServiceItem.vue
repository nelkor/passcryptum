<script setup lang="ts">
import { computed } from 'vue'

import type { ServiceData } from '@/entities/services-config'
import { CopyButton, IconDetails, IconKey, IconUser } from '@/shared'

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
  <li class="service-item">
    <span class="service-item__name">{{ service.name }}</span>

    <div class="service-item__controls">
      <select
        v-if="!isCopyDisabled"
        v-model="currentLogin"
        class="service-item__select"
        :disabled="isSelectDisabled"
      >
        <option v-for="login in logins" :key="login" :value="login">
          {{ login }}
        </option>
      </select>

      <CopyButton
        class="icon-button service-item__button"
        :disabled="isCopyDisabled"
        :get-content="getLogin"
      >
        <IconUser />
      </CopyButton>

      <CopyButton
        class="icon-button service-item__button"
        :disabled="isCopyDisabled"
        :get-content="getPassword"
      >
        <IconKey />
      </CopyButton>

      <button class="icon-button service-item__button" @click="openDetails">
        <IconDetails />
      </button>
    </div>
  </li>
</template>
