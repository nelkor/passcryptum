<script setup lang="ts">
import {
  NIcon,
  NModal,
  NSpace,
  NInput,
  useMessage,
  useLoadingBar,
} from 'naive-ui'
import { ref } from 'vue'
import { setPin } from '#/core'
import { KeyOutline, LockClosedOutline } from '@vicons/ionicons5'

import { FormSubmit } from '@/shared'
import { setPinState, isCalculationInProgress } from '@/entities/session'

import { showSetPinModal } from '../model'

const pin = ref('')
const message = useMessage()
const loadingBar = useLoadingBar()

const clearForm = () => {
  pin.value = ''
}

const onSubmit = () => {
  loadingBar.start()

  setPin(pin.value).then(() => {
    setPinState(true)
    message.success('PIN has been set')
    loadingBar.finish()

    isCalculationInProgress.value = false
    showSetPinModal.value = false
  })

  clearForm()

  isCalculationInProgress.value = true
}
</script>

<template>
  <NModal
    v-model:show="showSetPinModal"
    preset="card"
    class="app-modal"
    title="Setting PIN"
    @after-leave="clearForm"
  >
    <form @submit.prevent="onSubmit">
      <NSpace vertical size="large">
        <NInput
          v-model:value="pin"
          size="large"
          type="password"
          placeholder="Enter any PIN"
          show-password-on="mousedown"
          :input-props="{ name: 'PIN' }"
          :disabled="isCalculationInProgress"
        >
          <template #prefix>
            <NIcon :component="KeyOutline" />
          </template>
        </NInput>

        <FormSubmit :disabled="!pin">
          <template #icon>
            <LockClosedOutline />
          </template>
        </FormSubmit>
      </NSpace>
    </form>
  </NModal>
</template>
