import { computed, ref, shallowRef } from 'vue'
import type { Component } from 'vue'

const innerComponent = shallowRef()
const title = ref('')
const html = document.querySelector('.page')
const triggerModal = ref() as unknown as HTMLElement

if (!html) {
  throw new Error(`HTML element is undefined`)
}

export const open = ref(false)

export const modal = computed(() => ({
  isOpen: open,
  component: innerComponent.value,
  name: title,
  trigger: triggerModal,
}))

/** Удерживает фокус в модальном окне. Когда пользователь дотабал до нижнего интерактивного элемента то, следующий таб перемещает фокус на первый интерактивный элемент модального окна */
export const focusTrap = () => {
  const firstActiveElement = document.querySelector(
    '.modal__button'
  ) as HTMLElement

  setTimeout(() => {
    if (firstActiveElement) {
      firstActiveElement.focus()
    }
  })
}

export const showModal = (component: Component, title: string, e?: Event) => {
  html.classList.add('hidden')

  open.value = true
  modal.value.name.value = title
  modal.value.component = component

  if (e) {
    modal.value.trigger = e.currentTarget as HTMLElement
  }

  focusTrap()
}

const focusTriggerButton = () => {
  setTimeout(() => {
    if (modal.value.trigger) {
      modal.value.trigger.focus()
    }
  })
}

export const closeModal = () => {
  html.classList.remove('hidden')

  open.value = false

  focusTriggerButton()
}
