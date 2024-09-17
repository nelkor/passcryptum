import { ref } from 'vue'
import { ServiceData } from '#/services'

export let lastCopiedLogin = ''

export let isCopyPassword = false

export let serviceToCopy: ServiceData

export const isCredentialsModalShown = ref(false)

export const showCredentialsModal = (
  service: ServiceData,
  isPassword: boolean,
) => {
  serviceToCopy = service
  isCopyPassword = isPassword
  isCredentialsModalShown.value = true
}

export const clearLastCopiedLogin = () => {
  lastCopiedLogin = ''
}

export const setLastCopiedLogin = (name: string) => {
  lastCopiedLogin = name
}
