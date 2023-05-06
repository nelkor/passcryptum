import { computed, ref, shallowRef } from 'vue'
import type { Component } from 'vue'

import { createElementRef } from '@/shared'

import type { ModalState } from '../types'

const innerComponent = shallowRef()
const title = ref('')
const html = document.querySelector('.page')

if (!html) {
  throw new Error(`HTML element is undefined`)
}

export const open = ref(false)

export const buttonClose = createElementRef<HTMLButtonElement>()

export const modal = computed<ModalState>(() => ({
  isOpen: open,
  component: innerComponent.value,
  name: title,
  trigger: null,
  close: null,
}))

export const catchFocus = (button: HTMLElement) => {
  const firstActiveElement = button

  Promise.resolve().then(() => {
    if (firstActiveElement) {
      firstActiveElement.focus()
    }
  })
}

export const showModal = (component: Component, title: string, e?: Event) => {
  html.classList.add('hidden')

  open.value = true
  modal.value.name = title
  modal.value.component = component

  if (e) {
    modal.value.trigger = e.currentTarget
  }

  Promise.resolve().then(() => {
    buttonClose.value.focus()
  })
}

const focusTriggerButton = () => {
  Promise.resolve().then(() => {
    const button = modal.value.trigger

    if (button instanceof HTMLButtonElement) {
      button.focus()
    }
  })
}

export const closeModal = () => {
  html.classList.remove('hidden')

  open.value = false

  focusTriggerButton()
}
