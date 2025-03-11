import { computed } from 'vue'
import { deleteOnlinePin, deleteOfflinePin } from '#/core'
import { useMessage, useDialog, useLoadingBar } from 'naive-ui'

import {
  isOnlinePinSet,
  isOfflinePinSet,
  setOnlinePinState,
  setOfflinePinState,
  isCalculationInProgress,
} from '@/entities/session'

export const useDeleteOnlinePin = () => {
  const dialog = useDialog()
  const message = useMessage()
  const loadingBar = useLoadingBar()

  return {
    isDeleteOnlinePinDisabled: computed(
      () => !isOnlinePinSet.value || isCalculationInProgress.value,
    ),
    deleteOnlinePin() {
      dialog.warning({
        title: 'Your online PIN will be deleted',
        content: 'Are you sure you want to delete your online PIN?',
        positiveText: 'Yes, delete online PIN',
        negativeText: 'Cancel',
        onPositiveClick() {
          deleteOnlinePin()
          setOnlinePinState(false)
          loadingBar.start()
          message.info('Your online PIN has been deleted')
          requestAnimationFrame(() => loadingBar.finish())
        },
      })
    },
  }
}

export const useDeleteOfflinePin = () => {
  const dialog = useDialog()
  const message = useMessage()
  const loadingBar = useLoadingBar()

  return {
    isDeleteOfflinePinDisabled: computed(
      () => !isOfflinePinSet.value || isCalculationInProgress.value,
    ),
    deleteOfflinePin() {
      dialog.warning({
        title: 'Your offline PIN will be deleted',
        content: 'Are you sure you want to delete your offline PIN?',
        positiveText: 'Yes, delete offline PIN',
        negativeText: 'Cancel',
        onPositiveClick() {
          deleteOfflinePin()
          setOfflinePinState(false)
          loadingBar.start()
          message.info('Your offline PIN has been deleted')
          requestAnimationFrame(() => loadingBar.finish())
        },
      })
    },
  }
}
