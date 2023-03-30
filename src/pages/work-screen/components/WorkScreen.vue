<script setup lang="ts">
import { ConfigurationPanel } from '@/widgets/configuration-panel'
import { CustomServicesList } from '@/widgets/custom-services'
import { exit } from '@/features/entry'
</script>

<template>
  <h1>Work screen</h1>
  <button @click="exit">Exit</button>
  <ConfigurationPanel />
  <CustomServicesList />
</template>
