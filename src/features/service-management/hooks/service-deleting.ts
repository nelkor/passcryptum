import { deleteServiceByName } from '@/entities/services-config'

export const useServiceDeleting = (getName: () => string) => {
  const rmService = () => {
    alert(`Are you sure you want to delete "${getName()}"?\n— Yes!`)
    deleteServiceByName(getName())
  }

  return { rmService }
}
