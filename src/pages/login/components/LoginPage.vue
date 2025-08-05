<script setup lang="ts">
import { ref, watch, nextTick, onMounted } from 'vue';
import {
  NA,
  NCard,
  NTabs,
  NSpace,
  NTabPane,
  TabsInst,
  NButton,
  useMessage,
  useLoadingBar,
  NText,
} from 'naive-ui';
import { FingerPrintOutline } from '@vicons/ionicons5';

import { createElementRef } from '@/shared';
import { AppInfo } from '@/widgets/app-info';
import {
  isPinSet,
  enterByPin,
  enterByPassword,
  enterByBiometric,
  isCalculationInProgress,
} from '@/entities/session';
import {
  initBiometric,
  canUseBiometric,
  canSetupBiometric,
  showSetupBiometricModal,
} from '@/features/biometric';

import LoginForm from './LoginForm.vue';
import { SetupBiometricModal } from '@/features/biometric';

const tabs = {
  BIOMETRIC: 'biometric',
  PIN: 'pin',
  PASSWORD: 'password',
};

const message = useMessage();
const loadingBar = useLoadingBar();
const tabsInstRef = createElementRef<TabsInst>();
const currentTab = ref(tabs.PASSWORD);

// Инициализация биометрии при загрузке
onMounted(async () => {
  await initBiometric();
  updateCurrentTab();
});

const updateCurrentTab = () => {
  if (canUseBiometric.value) {
    currentTab.value = tabs.BIOMETRIC;
  } else if (isPinSet.value) {
    currentTab.value = tabs.PIN;
  } else {
    currentTab.value = tabs.PASSWORD;
  }
};

const onEnterPassword = (password: string) => {
  loadingBar.start();
  enterByPassword(password).then(() => loadingBar.finish());
};

const onEnterPin = (pin: string) => {
  loadingBar.start();

  enterByPin(pin)
    .then(() => loadingBar.finish())
    .catch(e => {
      loadingBar.error();
      message.error(e.message);
    });
};

const onBiometricAuth = async () => {
  loadingBar.start();
  
  try {
    await enterByBiometric();
    message.success('Biometric authentication successful');
    loadingBar.finish();
  } catch (error) {
    loadingBar.error();
    message.error('Biometric authentication failed');
    console.error('Biometric auth error:', error);
  }
};

const onSetupBiometric = () => {
  showSetupBiometricModal.value = true;
};

watch(isPinSet, () => {
  updateCurrentTab();
  nextTick(() => tabsInstRef.value?.syncBarPosition());
});

watch(canUseBiometric, () => {
  updateCurrentTab();
  nextTick(() => tabsInstRef.value?.syncBarPosition());
});
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
        <!-- Биометрическая аутентификация -->
        <NTabPane
          v-if="canUseBiometric"
          tab="Biometric"
          :name="tabs.BIOMETRIC"
          :disabled="isCalculationInProgress"
        >
          <NSpace vertical size="large" align="center">
            <NButton
              size="large"
              type="primary"
              :loading="isCalculationInProgress"
              @click="onBiometricAuth"
            >
              <template #icon>
                <FingerPrintOutline />
              </template>
              Use Touch ID / Face ID
            </NButton>
            
            <NText type="info" size="small">
              Use your device's biometric authentication
            </NText>
          </NSpace>
        </NTabPane>

        <!-- Настройка биометрии -->
        <NTabPane
          v-if="canSetupBiometric"
          tab="Setup Biometric"
          :name="tabs.BIOMETRIC"
          :disabled="isCalculationInProgress"
        >
          <NSpace vertical size="large" align="center">
            <NButton
              size="large"
              type="primary"
              :loading="isCalculationInProgress"
              @click="onSetupBiometric"
            >
              <template #icon>
                <FingerPrintOutline />
              </template>
              Setup Touch ID / Face ID
            </NButton>
            
            <NText type="info" size="small">
              Set up biometric authentication for quick access
            </NText>
          </NSpace>
        </NTabPane>

        <!-- PIN аутентификация -->
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

        <!-- Пароль аутентификация -->
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

    <!-- Модальное окно настройки биометрии -->
    <SetupBiometricModal />
  </NSpace>
</template>
