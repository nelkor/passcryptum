import { computed } from 'vue'
import { deletePin } from '#/core'
import { useMessage, useDialog, useLoadingBar } from 'naive-ui'

import {
  isPinSet,
  setPinState,
  isCalculationInProgress,
} from '@/entities/session'

export const useDeletePin = () => {
  const dialog = useDialog()
  const message = useMessage()
  const loadingBar = useLoadingBar()

  return {
    isDeletePinDisabled: computed(
      () => !isPinSet.value || isCalculationInProgress.value,
    ),
    deletePin() {
      dialog.warning({
        title: 'Your PIN will be deleted',
        content: 'Are you sure you want to delete your PIN?',
        positiveText: 'Yes, delete PIN',
        negativeText: 'Cancel',
        onPositiveClick() {
          deletePin()
          setPinState(false)
          loadingBar.start()
          message.info('Your PIN has been deleted')
          requestAnimationFrame(() => loadingBar.finish())
        },
      })
    },
  }
}
