import { useLoadingBar } from 'naive-ui'

import { DROPDOWN_TIMEOUT } from '@/shared'

import { closeSession } from '../model/private'

export const useExit = () => {
  const loadingBar = useLoadingBar()

  return {
    exit() {
      loadingBar.start()

      setTimeout(() => {
        closeSession()
        loadingBar.finish()
      }, DROPDOWN_TIMEOUT)
    },
  }
}
