import { deleteServiceByName } from '@/entities/services-config'

export const useServiceDeleting = (getName: () => string) => {
  const name = getName()

  const confirmationText = [
    'Are you sure you want to delete',
    `the "${name}" service?`,
  ].join(' ')

  const rmService = () => {
    if (confirm(confirmationText)) {
      deleteServiceByName(name)
    }
  }

  return { rmService }
}
