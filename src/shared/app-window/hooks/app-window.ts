import { watch } from 'vue'

import { createElementRef } from '@/shared'

import { isWindowOpen } from '../model/app-window'

export const useAppWindow = () => {
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

  watch(isWindowOpen, value => {
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
