<script setup lang="ts">
import { WorkHeader } from '@/widgets/work-header'
import { ServicesHeader } from '@/widgets/services-header'
import { ServicesList } from '@/widgets/services-list'
import { AppAside } from '@/entities/aside-window'
</script>

<template>
  <AppAside />

  <div class="work-wrapper">
    <div class="work-screen">
      <WorkHeader />
      <ServicesHeader />
      <ServicesList />
    </div>
  </div>
</template>
