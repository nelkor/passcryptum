import { ref, watch } from 'vue'
import type { ComputedRef } from 'vue'

import { setVersionOfLoginInService } from '@/entities/services-config'
import type { LoginData, ServiceData } from '@/entities/services-config'

import { getPasswordOfLogin } from '../lib/get-password-of-login'

export const useLoginItem = (
  service: ComputedRef<ServiceData>,
  login: ComputedRef<LoginData>
) => {
  const innerVersion = ref(login.value.version)

  const setVersion = (value: number) => {
    setVersionOfLoginInService(service.value.name, login.value.name, value)
  }

  const getLogin = () => login.value.name
  const getPassword = () => getPasswordOfLogin(service.value, login.value)

  watch(innerVersion, setVersion)

  watch(
    login,
    ({ version }) => {
      innerVersion.value = version
    },
    { deep: true }
  )

  return {
    innerVersion,
    getLogin,
    getPassword,
  }
}
