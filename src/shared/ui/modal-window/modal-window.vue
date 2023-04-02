<script setup lang="ts">
import { modal, modalClose, open } from '@/shared/lib/modal'
import './modal-window.scss'
</script>

<template>
  <div
    class="dialog-bg"
    :class="{ open: open }"
    :aria-hidden="!open"
    @click="modalClose()"
    @keydown.esc="modalClose()"
  >
    <dialog class="modal" :open="open" autofocus @click.stop>
      <header class="modal__header">
        <h3 id="modal-title" class="modal__title">
          {{ modal.name }}
        </h3>
        <button
          class="modal__button"
          aria-label="закрыть модальное окно"
          @click="modalClose()"
        >
          X
        </button>
      </header>
      <article class="modal__article">
        <component :is="modal.component" />
      </article>
    </dialog>
  </div>
</template>
