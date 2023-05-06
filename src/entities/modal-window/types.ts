import type { Ref } from 'vue'

export interface ModalState {
  isOpen: Ref<boolean>
  component: any
  name: string | Ref<string>
  trigger: null | EventTarget
}
