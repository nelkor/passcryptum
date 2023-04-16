import { computed, ref, shallowRef } from 'vue'
import type { Component } from 'vue'

const innerComponent = shallowRef(null)
const title = ref('') as unknown as String
const html = document.querySelector('.page')
const triggerModal = ref() as unknown as HTMLElement | null

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

/**  Открывает доступное модальное окно c переданными параматрами, блокирую прокрутку страницы.
 *  @param event event
 *  @param component component который хотим открыть в модальном окне
 *  @param  title загловок модального окна */
export const modalShow = (e: Event, component: Component, title: String) => {
  if (html) {
    html.classList.add('hidden')
  } else {
    throw new Error(`HTML element .page is null`)
  }

  modal.value.name = title
  modal.value.component = component as unknown as null
  modal.value.trigger = e.currentTarget as HTMLElement
  open.value = true
  focusTrap()
}

/** Закрывает доступное модальное окно */
export const modalClose = () => {
  if (html) {
    html.classList.remove('hidden')
  } else {
    throw new Error(`HTML element ${html} is null`)
  }

  open.value = false
  focusTriggerButton()
}

/** Перемещает фокус к вызываемому элементу модального окна */
const focusTriggerButton = () => {
  setTimeout(() => {
    if (modal.value.trigger) {
      modal.value.trigger.focus()
    } else {
      console.log('html element modal.value.trigger not found or null')
    }
  })
}
