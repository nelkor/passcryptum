import {
  ServiceDetails,
  saveConfiguration,
} from '@/features/service-management'
import { addService, getServiceByName } from '@/entities/services-config'
import { openAside } from '@/entities/aside-window'

export const useServiceHeader = () => {
  const startServiceCreation = () => {
    const name = prompt('Please enter a service name.')

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
