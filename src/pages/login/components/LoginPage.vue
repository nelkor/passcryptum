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
  NDivider,
} from 'naive-ui';
import { 
  FingerPrintOutline, 
  LockClosedOutline,
  ShieldCheckmarkOutline,
  SparklesOutline 
} from '@vicons/ionicons5';

import { createElementRef } from '@/shared';
import { AppInfo } from '@/widgets/app-info';
import {
  isPinSet,
  enterByPin,
  enterByPassword,
  isCalculationInProgress,
} from '@/entities/session';

import LoginForm from './LoginForm.vue';

const tabs = {
  PIN: 'pin',
  PASSWORD: 'password',
};

const message = useMessage();
const loadingBar = useLoadingBar();
const tabsInstRef = createElementRef<TabsInst>();
const currentTab = ref(isPinSet.value ? tabs.PIN : tabs.PASSWORD);

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

watch(isPinSet, () => {
  currentTab.value = tabs.PASSWORD;

  nextTick(() => tabsInstRef.value?.syncBarPosition());
});
</script>

<template>
  <div class="login-container">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-content">
        <div class="logo-container">
          <ShieldCheckmarkOutline class="logo-icon" />
          <h1 class="app-title">
            <span class="text-gradient">Passcryptum</span>
          </h1>
        </div>
        <p class="hero-subtitle">
          Secure password management with cryptographic generation
        </p>
        <div class="features-grid">
          <div class="feature-item">
            <SparklesOutline class="feature-icon" />
            <span>Cryptographic Security</span>
          </div>
          <div class="feature-item">
            <LockClosedOutline class="feature-icon" />
            <span>Zero Storage</span>
          </div>
          <div class="feature-item">
            <FingerPrintOutline class="feature-icon" />
            <span>Biometric Auth</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Login Form Section -->
    <div class="login-form-section">
      <NCard class="login-card modern-card" title="Sign in to your account">
        <NTabs
          ref="tabsInstRef"
          v-model:value="currentTab"
          size="large"
          type="segment"
          class="modern-tabs"
        >
          <NTabPane
            tab="PIN"
            :name="tabs.PIN"
            :disabled="isCalculationInProgress || !isPinSet"
          >
            <LoginForm
              :disabled="isCalculationInProgress"
              placeholder="Enter your PIN"
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
              placeholder="Enter your master password"
              @enter="onEnterPassword"
            />
          </NTabPane>
        </NTabs>

        <NDivider />

        <div class="login-footer">
          <NText depth="3" size="small">
            Remember only one password and have unique strong passwords for each account
          </NText>
        </div>
      </NCard>

      <div class="additional-info">
        <AppInfo />
        
        <NCard class="info-card modern-card" title="Previous version">
          <NA href="https://v1.passcryptum.com" class="version-link">
            v1.passcryptum.com
          </NA>
        </NCard>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
  gap: 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

.hero-section {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary-50), var(--primary-100));
  padding: 2rem;
  
  @media (max-width: 1024px) {
    padding: 1rem;
    min-height: 300px;
  }
}

.hero-content {
  text-align: center;
  max-width: 400px;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.logo-icon {
  width: 2rem;
  height: 2rem;
  color: var(--brand-primary);
}

.app-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
}

.hero-subtitle {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 2rem;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: var(--bg-secondary);
  border-radius: 8px;
  border: 1px solid var(--border-primary);
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
  
  span {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-primary);
    text-align: center;
  }
}

.feature-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: var(--brand-primary);
}

.login-form-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  
  @media (max-width: 1024px) {
    padding: 1rem;
  }
}

.login-card {
  max-width: 400px;
  margin: 0 auto;
  width: 100%;
}

.login-footer {
  text-align: center;
  margin-top: 1rem;
}

.additional-info {
  margin-top: 2rem;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}

.info-card {
  margin-top: 1rem;
}

.version-link {
  color: var(--brand-primary);
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
}

// Dark theme adjustments
body[theme='dark'] {
  .hero-section {
    background: linear-gradient(135deg, var(--neutral-800), var(--neutral-900));
  }
  
  .feature-item {
    background: var(--bg-tertiary);
    border-color: var(--border-secondary);
  }
}
</style>
