import type { ComputedRef } from 'vue'

import { closeAside } from '@/entities/aside-window'
import {
  deleteServiceByName,
  addLoginToService,
} from '@/entities/services-config'
import type { ServiceData } from '@/entities/services-config'

import { saveConfiguration } from '../lib/save-configuration'

export const useServiceDetails = (service: ComputedRef<ServiceData>) => {
  const deleteService = () => {
    const confirmationText = [
      'Are you sure you want to delete',
      `the "${service.value.name}" service?`,
    ].join(' ')

    if (confirm(confirmationText)) {
      deleteServiceByName(service.value.name)
      saveConfiguration()
      closeAside()
    }
  }

  const startLoginCreation = () => {
    const requestText = [
      'Please enter a login for',
      `the "${service.value.name}" service.`,
    ].join(' ')

    const name = prompt(requestText)

    if (!name) {
      return
    }

    try {
      addLoginToService(service.value.name, name)
      saveConfiguration()
    } catch (e) {
      alert('This login has already been added.')
    }
  }

  return {
    deleteService,
    startLoginCreation,
  }
}
