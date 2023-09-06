import { ref } from 'vue'
import { isTherePin } from '#/core'
import { createEmptyServices, parse } from '#/services'

export const privateIsPinSet = ref(isTherePin())

export const privateSessionId = ref<string | null>(null)

export const privateServices = ref(createEmptyServices())

export const initSession = (id: string, data: string | null) => {
  privateSessionId.value = id
  privateServices.value = parse(data)
}

export const closeSession = () => {
  privateSessionId.value = null
  privateServices.value = createEmptyServices()
}
