<script setup lang="ts">
import { modalClose, modalShow } from '@/shared/lib/modal'

defineProps<{ title: string }>()
</script>

<template>
  <dialog class="modal" open aria-live="assertive" @keydown.esc="modalClose()">
    <header class="modal__header">
      <h3 class="modal__title">{{ title }}</h3>
      <button class="modal__button" aria-label="close" @click="modalClose()">X</button>
    </header>
    <article class="modal__article">
      <slot />
    </article>
  </dialog>
</template>


