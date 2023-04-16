<script setup lang="ts">
import { ConfigurationPanel } from '@/widgets/configuration-panel'
import { ServicesList } from '@/widgets/services-list'
import { ShortHash } from '@/widgets/short-hash'
import { exit } from '@/features/entry'
import ModalWindow from '@/shared/ui/modal-window/modalWindow.vue'
import { open } from '@/shared/lib/modal'
</script>

<template>
  <main :inert="open">
    <h1>Work screen</h1>
    <ShortHash />
    <button @click="exit">Exit</button>
    <ConfigurationPanel />
    <ServicesList />
  </main>
  <ModalWindow />
</template>
