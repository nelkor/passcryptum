import { watch } from 'vue'

import { createElementRef } from '@/shared'

import { isAsideOpen } from '../model/aside-window'

export const useAppAside = () => {
  const buttonClose = createElementRef<HTMLButtonElement>()

  const focusButtonClose = () => {
    buttonClose.value.focus()
  }

  const focusLastInput = () => {
    const nodes = document.querySelectorAll<HTMLInputElement>(
      '.aside__input:not([disabled])'
    )

    const el = nodes.item(nodes.length - 1)

    if (el) {
      el.focus()
    } else {
      focusButtonClose()
    }
  }

  watch(isAsideOpen, value => {
    if (value) {
      Promise.resolve().then(focusButtonClose)
    }
  })

  return {
    buttonClose,
    focusButtonClose,
    focusLastInput,
  }
}
