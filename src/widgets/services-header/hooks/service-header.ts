import { addService } from '@/entities/services-config'

export const useServiceHeader = () => {
  const startServiceCreation = () => {
    const name = prompt('Please enter a service name.')

    if (!name) {
      return
    }

    try {
      addService(name)
    } catch (e) {
      alert('A service with the same name already exists')
    }
  }

  return { startServiceCreation }
}
