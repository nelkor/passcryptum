import type { Ref } from 'vue'

export interface Modal {
  isOpen: Ref<boolean>
  component: any
  name: string | Ref<string>
  trigger: null | EventTarget
}
