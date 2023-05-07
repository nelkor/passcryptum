<script setup lang="ts">
import { appModal, isOpenModal } from '@/entities/modal-window'

import { useAppModal } from '../hooks/app-modal'

const { closeModal, focusButtonClose } = useAppModal()

const { buttonClose } = appModal.value
</script>

<template>
  <div
    class="dialog-bg"
    :class="{ open: isOpenModal }"
    :aria-hidden="!isOpenModal"
    @click="closeModal"
    @keydown.esc="closeModal"
  >
    <dialog class="modal" :open="isOpenModal" @click.stop>
      <header class="modal__header">
        <h3 id="modal-title" class="modal__title">
          {{ appModal.name }}
        </h3>

        <button
          ref="buttonClose"
          class="modal__button"
          aria-label="закрыть модальное окно"
          @click="closeModal"
        >
          X
        </button>
      </header>

      <article class="modal__article">
        <component :is="appModal.component" />
      </article>

      <input class="modal__end-tab visually-hidden" @focus="focusButtonClose" />
    </dialog>
  </div>
</template>
