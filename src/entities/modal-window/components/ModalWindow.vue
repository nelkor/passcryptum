<script setup lang="ts">
import { ref } from 'vue'

import { modal, closeModal, open, catchFocus } from '../lib/modal'

const button = ref(null)
</script>

<template>
  <div
    class="dialog-bg"
    :class="{ open }"
    :aria-hidden="!open"
    @click="closeModal"
    @keydown.esc="closeModal"
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
          @click="closeModal"
        >
          X
        </button>
      </header>

      <article class="modal__article">
        <component :is="modal.component" />
      </article>

      <input
        class="modal__end-tab visually-hidden"
        @focus="() => catchFocus(button)"
      />
    </dialog>
  </div>
</template>
