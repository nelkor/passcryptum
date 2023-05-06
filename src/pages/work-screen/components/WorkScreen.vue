<script setup lang="ts">
import { AppHeader } from '@/widgets/app-header'
import { ServicesHeader } from '@/widgets/services-header'
import { ServicesList } from '@/widgets/services-list'
import { AppAside } from '@/entities/aside-window'
</script>

<template>
  <AppAside />

  <div class="work-wrapper">
    <div class="work-screen">
      <AppHeader />
      <ServicesHeader />
      <ServicesList />
    </div>
  </div>
</template>
