import {
  ServiceDetails,
  saveConfiguration,
} from '@/features/service-management'
import { addService, getServiceByName } from '@/entities/services-config'
import { openAside } from '@/entities/aside-window'

export const useServiceHeader = () => {
  const startServiceCreation = () => {
    const enteredName = prompt('Please enter a service name.')
    const name = enteredName && enteredName.trim()

    if (!name) {
      return
    }

    try {
      addService(name)
      saveConfiguration()
    } catch (e) {
      alert('This service has already been added.')
    }

    openAside(name, ServiceDetails, { service: getServiceByName(name) })
  }

  return { startServiceCreation }
}
