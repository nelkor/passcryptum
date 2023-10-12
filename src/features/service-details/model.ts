import { ref } from 'vue'
import { ServiceData } from '#/services'

export let service: ServiceData

export const showAddLoginModal = ref(false)

export const isServiceDetailsShown = ref(false)

export const showServiceDetails = (serviceData: ServiceData) => {
  service = serviceData
  isServiceDetailsShown.value = true
}
