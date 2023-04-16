<script setup lang="ts">
import { MasterForm } from '@/features/entry'
import ModalWindow from '@/shared/ui/modal-window/modalWindow.vue'
import { open } from '@/shared/lib/modal'
</script>

<template>
  <main :inert="open">
    <h1>Password entry</h1>
    <MasterForm />
  </main>
  <ModalWindow />
</template>
