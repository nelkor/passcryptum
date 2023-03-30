import { deleteCustomServiceByName } from '@/entities/services-config'

export const useCustomService = (getName: () => string) => {
  const rmService = () => {
    alert(`Are you sure you want to delete "${getName()}"?\n— Yes!`)
    deleteCustomServiceByName(getName())
  }

  return { rmService }
}
