<script setup lang="ts">
import { MasterForm } from '@/features/entry'
import { ModalWindow } from '@/entities/modal-window'
import { showModal } from '@/entities/modal-window'
import { open } from '@/entities/modal-window'
</script>

<template>
  <main :inert="open">
    <button
      aria-label="открыть модальное окно для ввода мастерпароля"
      @click="e => showModal(MasterForm, 'Register', e)"
    >
      открыть
    </button>
    <h1>Password entry</h1>
    <MasterForm />
  </main>
  <ModalWindow />
</template>
