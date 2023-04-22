<script setup lang="ts">
import { ref } from 'vue'

import { modal, modalClose, open, focusTrap } from '../lib/modal'
import './modal-window.scss'
import '@/shared/styel/helpers.scss'

const button = ref()
</script>

<template>
  <div
    class="dialog-bg"
    :class="{ open }"
    :aria-hidden="!open"
    @click="modalClose"
    @keydown.esc="modalClose"
  >
    <dialog class="modal" :open="open" @click.stop>
      <header class="modal__header">
        <h3 id="modal-title" class="modal__title">
          {{ modal.name }}
        </h3>

        <button
          ref="button"
          class="modal__button"
          aria-label="закрыть модальное окно"
          @click="modalClose"
        >
          X
        </button>
      </header>

      <article class="modal__article">
        <component :is="modal.component" />
      </article>

      <input
        class="modal__end-tab visually-hidden"
        type="text"
        @focus="focusTrap"
      />
    </dialog>
  </div>
</template>
