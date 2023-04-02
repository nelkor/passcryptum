import { computed, ref, shallowRef } from 'vue'
import type { Component } from 'vue'

export const open = ref(false)

const innerComponent = shallowRef(null)
const title = ref('') as unknown as String
const html = document.querySelector('.page')

export const modal = computed(() => ({
  isOpen: open,
  component: innerComponent.value,
  name: title,
}))

export const modalShow = (component: Component, title: String) => {
  if (html) {
    html.classList.add('hidden')
  } else {
    throw new Error(`HTML element .page is null`)
  }

  modal.value.name = title
  modal.value.component = component as unknown as null
  // console.log(focusTrap())
  open.value = true
}

export const modalClose = () => {
  if (html) {
    html.classList.remove('hidden')
  } else {
    throw new Error(`HTML element ${html} is null`)
  }

  open.value = false
}

// export const focusTrap = () => {
//   const element = document.querySelector('.modal') as HTMLElement
//
//   const focusableEls = element.querySelectorAll(
//     'form, a, button, textarea, select, input, label'
//   )
//
//   console.log(focusableEls)
//
//   const firstFocusableEl = focusableEls[0] as HTMLElement
//   const lastFocusableEl = focusableEls[focusableEls.length - 1] as HTMLElement
//   const KEYCODE_TAB = 9
//
//   element.addEventListener('keydown', e => {
//     const isTabPressed = e.key === 'Tab' || e.keyCode === KEYCODE_TAB
//
//     if (!isTabPressed) {
//       return
//     }
//
//     /* shift + tab */
//     if (e.shiftKey) {
//       if (document.activeElement === firstFocusableEl) {
//         lastFocusableEl.focus()
//         e.preventDefault()
//       }
//     } /* tab */ else {
//       if (document.activeElement === lastFocusableEl) {
//         firstFocusableEl.focus()
//         e.preventDefault()
//       }
//     }
//   })
// }
