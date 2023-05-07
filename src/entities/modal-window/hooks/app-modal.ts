import type { Component } from 'vue'

import {
  titleModal,
  trigger,
  isOpenModal,
  buttonClose,
  innerComponent,
} from '@/entities/modal-window'

const html = document.querySelector('.page')

if (!html) {
  throw new Error(`HTML element is undefined`)
}

export const useAppModal = () => {
  const focusButtonClose = () => {
    buttonClose.value.focus()
  }

  const showModal = (component: Component, title: string, e?: Event) => {
    html.classList.add('hidden')
    isOpenModal.value = true
    titleModal.value = title
    innerComponent.value = component

    if (e) {
      trigger.value = e.currentTarget
    }

    Promise.resolve().then(focusButtonClose)
  }

  const closeModal = () => {
    html.classList.remove('hidden')

    isOpenModal.value = false

    Promise.resolve().then(() => trigger.value.focus())
  }

  return {
    showModal,
    closeModal,
    focusButtonClose,
  }
}
