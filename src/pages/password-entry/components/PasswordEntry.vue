<script setup lang="ts">
import { MasterForm } from '@/features/entry'
import { ModalWindow } from '@/entities/modal-window/index'
import { open, modalShow } from '@/entities/modal-window/index'
</script>

<template>
  <main :inert="open">
    <button
      aria-label="открыть модальное окно для ввода мастерпароля"
      @click="e => modalShow(e, MasterForm, 'Register')"
    >
      открыть
    </button>
    <h1>Password entry</h1>
    <MasterForm />
  </main>
  <ModalWindow />
</template>
