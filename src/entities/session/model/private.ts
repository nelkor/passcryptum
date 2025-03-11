import { ref } from 'vue'
import { isThereOnlinePin, isThereOfflinePin } from '#/core'
import { createEmptyServices, parse } from '#/services'

export const privateIsOnlinePinSet = ref(isThereOnlinePin())

export const privateIsOfflinePinSet = ref(isThereOfflinePin())

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
