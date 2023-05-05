<script setup lang="ts">
import { AppHeader } from '@/widgets/app-header'
import { ServicesHeader } from '@/widgets/services-header'
import { ServicesList } from '@/widgets/services-list'
import { AppAside } from '@/entities/aside-window'
</script>

<template>
  <AppAside />
  <AppHeader />
  <ServicesHeader />
  <ServicesList />
</template>
