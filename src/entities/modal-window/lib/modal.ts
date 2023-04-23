import { computed, ref, shallowRef } from 'vue'
import type { Component } from 'vue'

const innerComponent = shallowRef(null)
const title = ref('')
const html = document.querySelector('.page')
const triggerModal = ref() as unknown as HTMLElement | null

if (!html) {
  throw new Error(`HTML element .page is null`)
}

export const open = ref(false)

export const modal = computed(() => ({
  isOpen: open,
  component: innerComponent.value,
  name: title,
  trigger: triggerModal,
}))

/** Удерживает фокус в модальном окне. Когда пользователь дотабал до нижнего интерактивного элемента то, следующий таб перемещает фокус на первый интерактивный элемент модального окна*/
export const focusTrap = () => {
  const firstActiveElement = document.querySelector(
    '.modal__button'
  ) as HTMLElement

  setTimeout(() => {
    if (firstActiveElement) {
      firstActiveElement.focus()
    } else {
      console.log('html element modal.value.trigger not found or null')
    }
  })
}

export const showModal = (component: Component, title: string, e?: Event) => {
  html.classList.add('hidden')

  open.value = true
  modal.value.name.value = title
  modal.value.component = component as unknown as null

  if (e) {
    modal.value.trigger = e.currentTarget as HTMLElement
  }

  focusTrap()
}

export const closeModal = () => {
  html.classList.remove('hidden')

  open.value = false

  focusTriggerButton()
}

const focusTriggerButton = () => {
  setTimeout(() => {
    if (modal.value.trigger) {
      modal.value.trigger.focus()
    } else {
      console.log('html element modal.value.trigger not found or null')
    }
  })
}
