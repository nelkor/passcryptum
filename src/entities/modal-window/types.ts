import type { Ref } from 'vue'

export interface ModalState {
  isOpen: boolean
  component: string
  name: string
  trigger: Ref
  buttonClose: Ref
}
