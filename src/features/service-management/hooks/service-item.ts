import { ref, watch, computed } from 'vue'
import type { ComputedRef } from 'vue'

import { openAside } from '@/entities/aside-window'
import type { ServiceData } from '@/entities/services-config'

import { getPasswordOfLogin } from '../lib/get-password-of-login'
import ServiceDetails from '../components/ServiceDetails.vue'

export const useServiceItem = (service: ComputedRef<ServiceData>) => {
  const logins = computed(() => service.value.logins.map(({ name }) => name))
  const isSelectDisabled = computed(() => logins.value.length < 2)
  const isCopyDisabled = computed(() => logins.value.length < 1)
  const currentLogin = ref('')

  const openDetails = () => {
    openAside(service.value.name, ServiceDetails, { service })
  }

  const getLogin = () => currentLogin.value

  const getPassword = () => {
    const login = service.value.logins.find(
      ({ name }) => name === currentLogin.value
    )

    if (!login) {
      throw new Error('Attempt to take the password of a non-existent login')
    }

    return getPasswordOfLogin(service.value, login)
  }

  watch(
    service,
    () => {
      if (!logins.value.includes(currentLogin.value)) {
        currentLogin.value = logins.value[0] || ''
      }
    },
    { deep: true, immediate: true }
  )

  return {
    logins,
    currentLogin,
    isSelectDisabled,
    isCopyDisabled,
    openDetails,
    getLogin,
    getPassword,
  }
}
