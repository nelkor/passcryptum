import type { Component } from 'vue'
import { computed, ref, shallowRef } from 'vue'

import { disableScroll, enableScroll } from '@/dom'

let previousFocus: HTMLInputElement | null = null

export const isWindowOpen = ref(false)

const windowComponent = shallowRef<Component | null>(null)
const windowAttrs = ref<Record<string, unknown>>({})
const windowTitle = ref('')

export const windowState = computed(() => ({
  component: windowComponent.value,
  attrs: windowAttrs.value,
  title: windowTitle.value,
}))

export const openWindow = (
  title: string,
  component: Component,
  attrs: Record<string, unknown> = {}
) => {
  if (document.activeElement) {
    previousFocus = document.activeElement as HTMLInputElement
  }

  windowComponent.value = component
  windowTitle.value = title
  windowAttrs.value = attrs
  isWindowOpen.value = true

  disableScroll()
}

export const closeWindow = () => {
  if (previousFocus) {
    previousFocus.focus()

    previousFocus = null
  }

  isWindowOpen.value = false
  windowTitle.value = ''
  windowAttrs.value = {}
  windowComponent.value = null

  enableScroll()
}
