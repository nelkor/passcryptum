<script setup lang="ts">
import { AppHeader } from '@/widgets/app-header'
import { ServicesList } from '@/widgets/services-list'
import { AppAside } from '@/entities/aside-window'
</script>

<template>
  <AppAside />
  <AppHeader />
  <ServicesList />
</template>
