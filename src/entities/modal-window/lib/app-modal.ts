import { computed, ref, shallowRef } from 'vue'

import type { ModalState } from '@/entities/modal-window/types'
import { createElementRef } from '@/shared'

export const innerComponent = shallowRef()

export const titleModal = ref('')

export const buttonClose = createElementRef<HTMLButtonElement>()

export const trigger = ref()

export const isOpenModal = ref(false)

export const appModal = computed<ModalState>(() => ({
  isOpen: isOpenModal.value,
  component: innerComponent.value,
  name: titleModal.value,
  trigger,
  buttonClose,
}))
