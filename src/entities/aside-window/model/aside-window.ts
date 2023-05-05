import { computed, ref, shallowRef } from 'vue'
import type { Component } from 'vue'

import { disableScroll, enableScroll } from '@/dom'

import type { AsideState } from '../types'

let previousFocus: HTMLInputElement | null = null

const asideState = ref<AsideState>({
  isOpen: false,
  title: '',
})

export const asideComponent = shallowRef<Component | null>(null)

export const isAsideOpen = computed(() => asideState.value.isOpen)

export const asideTitle = computed(() => asideState.value.title)

export const openAside = (title: string, component: Component) => {
  if (document.activeElement) {
    previousFocus = document.activeElement as HTMLInputElement
  }

  asideComponent.value = component
  asideState.value.title = title
  asideState.value.isOpen = true

  disableScroll()
}

export const closeAside = () => {
  if (previousFocus) {
    previousFocus.focus()

    previousFocus = null
  }

  asideState.value.isOpen = false
  asideState.value.title = ''
  asideComponent.value = null

  enableScroll()
}
