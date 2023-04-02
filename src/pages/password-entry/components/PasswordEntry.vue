<script setup lang="ts">
import { MasterForm } from '@/features/entry'
import ModalWindow from '@/shared/ui/modal-window/modal-window.vue'
import { modalShow, open } from '@/shared/lib/modal'

const clickButton = () => {
  modalShow(MasterForm, 'регистрация')
}
</script>

<template>
  <main :inert="open">
    <h1>Password entry</h1>
    <button aria-label="открыть модальное окно" @click="clickButton">
      open
    </button>
    <MasterForm />
    <button>button</button>
    <button>button</button>
    <button>button</button>
    <button>button</button>
    <a href="#">a href</a>
    <a href="#">a href</a>
    <a href="#">a href</a>
  </main>
  <ModalWindow />
</template>
