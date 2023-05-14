import { computed, ref, shallowRef } from 'vue'
import type { Component } from 'vue'

import { disableScroll, enableScroll } from '@/dom'

let previousFocus: HTMLInputElement | null = null

export const isAsideOpen = ref(false)

const asideComponent = shallowRef<Component | null>(null)
const asideAttrs = ref<Record<string, unknown>>({})
const asideTitle = ref('')

export const asideState = computed(() => ({
  component: asideComponent.value,
  attrs: asideAttrs.value,
  title: asideTitle.value,
}))

export const openAside = (
  title: string,
  component: Component,
  attrs: Record<string, unknown> = {}
) => {
  if (document.activeElement) {
    previousFocus = document.activeElement as HTMLInputElement
  }

  asideComponent.value = component
  asideTitle.value = title
  asideAttrs.value = attrs
  isAsideOpen.value = true

  disableScroll()
}

export const closeAside = () => {
  if (previousFocus) {
    previousFocus.focus()

    previousFocus = null
  }

  isAsideOpen.value = false
  asideTitle.value = ''
  asideAttrs.value = {}
  asideComponent.value = null

  enableScroll()
}
