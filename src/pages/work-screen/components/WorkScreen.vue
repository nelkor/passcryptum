<script setup lang="ts">
import { AppWindow } from '@/shared/app-window'
import { WorkHeader } from '@/widgets/work-header'
import { ServicesHeader } from '@/widgets/services-header'
import { ServicesList } from '@/widgets/services-list'
</script>

<template>
  <AppWindow />

  <div class="work-wrapper">
    <div class="work-screen">
      <WorkHeader />
      <ServicesHeader />
      <ServicesList />
    </div>
  </div>
</template>
