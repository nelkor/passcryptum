<script setup lang="ts">
import { ref } from 'vue'
import {
  AppsOutline,
  AddCircleOutline,
  PersonAddOutline,
} from '@vicons/ionicons5'
import { NIcon, NModal, NSpace, NInput, useLoadingBar } from 'naive-ui'

import { FormSubmit } from '@/shared'
import { addServiceAndLogin, isCalculationInProgress } from '@/entities/session'

import { showAddServiceModal } from '../model'

const serviceName = ref('')
const loginName = ref('')
const loadingBar = useLoadingBar()

const clearForm = () => {
  loginName.value = ''
  serviceName.value = ''
}

const onSubmit = () => {
  loadingBar.start()

  addServiceAndLogin(serviceName.value, loginName.value).then(() => {
    loadingBar.finish()

    showAddServiceModal.value = false
    isCalculationInProgress.value = false
  })

  clearForm()

  isCalculationInProgress.value = true
}
</script>

<template>
  <NModal
    v-model:show="showAddServiceModal"
    preset="card"
    class="app-modal"
    title="Service addition"
    @after-leave="clearForm"
  >
    <form @submit.prevent="onSubmit">
      <NSpace vertical size="large">
        <NInput
          v-model:value="serviceName"
          size="large"
          placeholder="Enter service name"
          :input-props="{ name: 'Service' }"
          :disabled="isCalculationInProgress"
        >
          <template #prefix>
            <NIcon :component="AppsOutline" />
          </template>
        </NInput>

        <NInput
          v-model:value="loginName"
          size="large"
          placeholder="Enter login"
          :input-props="{ name: 'Login' }"
          :disabled="isCalculationInProgress"
        >
          <template #prefix>
            <NIcon :component="PersonAddOutline" />
          </template>
        </NInput>

        <FormSubmit :disabled="!serviceName">
          <template #icon>
            <AddCircleOutline />
          </template>
        </FormSubmit>
      </NSpace>
    </form>
  </NModal>
</template>
