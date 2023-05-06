import { computed, ref, shallowRef } from 'vue'
import type { Component, ComputedRef } from 'vue'

import type { Modal } from '../types'

const innerComponent = shallowRef()
const title = ref('')
const html = document.querySelector('.page')

if (!html) {
  throw new Error(`HTML element is undefined`)
}

export const open = ref(false)

export const modal = computed<Modal>(() => ({
  isOpen: open,
  component: innerComponent.value,
  name: title,
  trigger: null,
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
}

const focusTriggerButton = () => {
  Promise.resolve().then(() => {
    const button = modal.value.trigger as HTMLButtonElement

    if (button) {
      button.focus()
    }
  })
}

export const closeModal = () => {
  html.classList.remove('hidden')

  open.value = false

  focusTriggerButton()
}
