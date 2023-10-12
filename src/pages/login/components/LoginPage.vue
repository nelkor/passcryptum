<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import {
  NA,
  NCard,
  NTabs,
  NSpace,
  NTabPane,
  TabsInst,
  useMessage,
  useLoadingBar,
} from 'naive-ui'

import { createElementRef } from '@/shared'
import { AppInfo } from '@/widgets/app-info'
import {
  isPinSet,
  enterByPin,
  enterByPassword,
  isCalculationInProgress,
} from '@/entities/session'

import LoginForm from './LoginForm.vue'

const tabs = {
  PIN: 'pin',
  PASSWORD: 'password',
}

const message = useMessage()
const loadingBar = useLoadingBar()
const tabsInstRef = createElementRef<TabsInst>()
const currentTab = ref(isPinSet.value ? tabs.PIN : tabs.PASSWORD)

const onEnterPassword = (password: string) => {
  loadingBar.start()
  enterByPassword(password).then(() => loadingBar.finish())
}

const onEnterPin = (pin: string) => {
  loadingBar.start()

  enterByPin(pin)
    .then(() => loadingBar.finish())
    .catch(e => {
      loadingBar.error()
      message.error(e.message)
    })
}

watch(isPinSet, () => {
  currentTab.value = tabs.PASSWORD

  nextTick(() => tabsInstRef.value.syncBarPosition())
})
</script>

<template>
  <NSpace vertical size="large">
    <NCard title="Sign in">
      <NTabs
        ref="tabsInstRef"
        v-model:value="currentTab"
        size="large"
        type="segment"
      >
        <NTabPane
          tab="PIN"
          :name="tabs.PIN"
          :disabled="isCalculationInProgress || !isPinSet"
        >
          <LoginForm
            :disabled="isCalculationInProgress"
            placeholder="Enter PIN"
            @enter="onEnterPin"
          />
        </NTabPane>

        <NTabPane
          tab="Password"
          :name="tabs.PASSWORD"
          :disabled="isCalculationInProgress"
        >
          <LoginForm
            :disabled="isCalculationInProgress"
            placeholder="Enter password"
            @enter="onEnterPassword"
          />
        </NTabPane>
      </NTabs>
    </NCard>

    <AppInfo />

    <NCard title="Previous version">
      <NA href="https://v1.passcryptum.com">v1.passcryptum.com</NA>
    </NCard>
  </NSpace>
</template>
