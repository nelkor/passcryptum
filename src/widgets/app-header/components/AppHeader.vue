<script setup lang="ts">
import { NLayoutHeader, NText } from 'naive-ui'

import { ServicesFilter } from '@/features/services-filter'

import AppLogo from './AppLogo.vue'
import MenuButton from './MenuButton.vue'
import { useAppHeader } from '../hooks/app-header'

const { isEntered } = useAppHeader()
</script>

<template>
  <NLayoutHeader bordered class="app-header">
    <div class="constant-header">
      <AppLogo />
      <ServicesFilter v-if="isEntered" class="constant-services-filter" />

      <div class="header-content">
        <NText class="app-version">2.0.0</NText>
        <MenuButton :is-entered="isEntered" />
      </div>
    </div>

    <div v-if="isEntered" class="extra-header">
      <ServicesFilter />
    </div>
  </NLayoutHeader>
</template>
