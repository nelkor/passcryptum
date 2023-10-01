<script setup lang="ts">
import {
  NCard,
  useDialog,
  useMessage,
  NInputNumber,
  useLoadingBar,
} from 'naive-ui'
import { ref, onMounted } from 'vue'
import { LoginData } from '#/services'

import { createElementRef } from '@/shared'
import { rmLogin, setVersionOfLogin } from '@/entities/session'

import { service } from '../model'

const dialog = useDialog()
const message = useMessage()
const loadingBar = useLoadingBar()
const props = defineProps<{ login: LoginData }>()
const innerVersion = ref(props.login.version)
const inputWrapperRef = createElementRef<HTMLDivElement>()

const onVersionBlur = () => {
  if (!Number.isFinite(innerVersion.value) || innerVersion.value < 0) {
    innerVersion.value = 1
  }

  setVersionOfLogin(service.name, props.login.name, innerVersion.value)
}

const onDeleteClick = () => {
  dialog.warning({
    title: 'Login will be deleted',
    content: `Are you sure you want to delete the login '${props.login.name}'?`,
    positiveText: 'Delete',
    negativeText: 'Cancel',
    onPositiveClick() {
      loadingBar.start()

      rmLogin(service.name, props.login.name).then(() => {
        loadingBar.finish()
        message.info(`The login '${props.login.name}' has been deleted`)
      })
    },
  })
}

onMounted(() => {
  inputWrapperRef.value.$el
    .querySelector('input')
    .setAttribute('name', 'Version')
})
</script>

<template>
  <NCard
    closable
    hoverable
    size="small"
    :title="login.name"
    @close="onDeleteClick"
  >
    <NInputNumber
      ref="inputWrapperRef"
      v-model:value="innerVersion"
      min="1"
      size="small"
      class="version-input"
      @blur="onVersionBlur"
    >
      <template #prefix>version</template>
    </NInputNumber>
  </NCard>
</template>
