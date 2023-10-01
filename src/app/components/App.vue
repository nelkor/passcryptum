<script setup lang="ts">
import { NLayout, NLayoutContent } from 'naive-ui'

import { WorkPage } from '@/pages/work'
import { LoginPage } from '@/pages/login'
import { sessionId } from '@/entities/session'
import { AppHeader } from '@/widgets/app-header'

import NaiveProvider from './NaiveProvider.vue'
</script>

<template>
  <NaiveProvider>
    <NLayout>
      <AppHeader />

      <NLayoutContent class="app-layout-content" :native-scrollbar="false">
        <div class="page-wrapper">
          <WorkPage v-if="sessionId" />
          <LoginPage v-else />
        </div>
      </NLayoutContent>
    </NLayout>
  </NaiveProvider>
</template>
