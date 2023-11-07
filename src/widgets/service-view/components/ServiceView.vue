<script setup lang="ts">
import { NH1, NSpace, NButton } from 'naive-ui'
import { Close, CopyOutline, SettingsOutline } from '@vicons/ionicons5'

import {
  servicesCount,
  selectedService,
  clearSelectedService,
} from '@/entities/session'
import { CredentialsModal } from '@/features/credentials'
import { showServiceDetails } from '@/features/service-details'
import { AddLoginModal, ServiceDetails } from '@/features/service-details'

import { useServiceView } from '../hooks/service-view'

const { onCopyLogin, onCopyPassword, loginJustCopied, passwordJustCopied } =
  useServiceView()
</script>

<template>
  <NH1>
    {{ selectedService.name }}

    <NButton v-if="servicesCount > 1" tertiary @click="clearSelectedService">
      <template #icon>
        <Close />
      </template>
    </NButton>
  </NH1>

  <NSpace size="large" justify="end">
    <NButton
      class="service-list-button"
      :loading="loginJustCopied"
      :disabled="!selectedService.logins.length"
      @click="onCopyLogin"
    >
      <template #icon>
        <CopyOutline />
      </template>

      Copy login
    </NButton>

    <NButton
      class="service-list-button"
      :loading="passwordJustCopied"
      :disabled="!selectedService.logins.length"
      @click="onCopyPassword"
    >
      <template #icon>
        <CopyOutline />
      </template>

      Copy password
    </NButton>

    <NButton
      strong
      secondary
      class="service-list-button"
      @click="() => showServiceDetails(selectedService)"
    >
      <template #icon>
        <SettingsOutline />
      </template>

      Settings
    </NButton>
  </NSpace>

  <CredentialsModal />
  <ServiceDetails />
  <AddLoginModal />
</template>
