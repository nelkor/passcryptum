import { ref, Ref, watch } from 'vue'
import { useMessage } from 'naive-ui'
import { ServiceData } from '#/services'

import {
  copyLogin,
  copyPassword,
  clearLastCopiedLogin,
} from '@/features/credentials'
import { COPY_DELAY_TIME } from '@/shared'
import { selectedService } from '@/entities/session'

export const useServiceView = () => {
  const message = useMessage()
  const loginJustCopied = ref(false)
  const passwordJustCopied = ref(false)

  const createCopyHandler =
    (justCopied: Ref<boolean>, copy: (service: ServiceData) => boolean) =>
    () => {
      if (justCopied.value) {
        return
      }

      const inClipboard = copy(selectedService.value)

      justCopied.value = true

      setTimeout(() => {
        justCopied.value = false

        if (inClipboard) {
          message.info('In your clipboard')
        }
      }, COPY_DELAY_TIME)
    }

  const onCopyLogin = createCopyHandler(loginJustCopied, copyLogin)
  const onCopyPassword = createCopyHandler(passwordJustCopied, copyPassword)

  watch(selectedService, clearLastCopiedLogin)

  return {
    onCopyLogin,
    onCopyPassword,
    loginJustCopied,
    passwordJustCopied,
  }
}
