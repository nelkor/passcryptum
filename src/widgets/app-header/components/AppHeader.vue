<script setup lang="ts">
import { NLayoutHeader, NText, NSpace } from 'naive-ui';
import { ShieldCheckmarkOutline } from '@vicons/ionicons5';

import { ServicesSelect, ServicesFilter } from '@/entities/session';

import AppLogo from './AppLogo.vue';
import MenuButton from './MenuButton.vue';
import { useAppHeader } from '../hooks/app-header';

const { isEntered } = useAppHeader();
</script>

<template>
  <NLayoutHeader class="app-header modern-header">
    <div class="header-container">
      <div class="header-left">
        <div class="logo-section">
          <ShieldCheckmarkOutline class="header-logo-icon" />
          <AppLogo />
        </div>
        
        <ServicesFilter v-if="isEntered" class="services-filter" />
      </div>

      <div class="header-right">
        <NText class="app-version">v2.1.4</NText>
        <MenuButton :is-entered="isEntered" />
      </div>
    </div>

    <div v-if="isEntered" class="services-section">
      <ServicesSelect />
    </div>
  </NLayoutHeader>
</template>

<style scoped lang="scss">
.app-header {
  padding: 0;
  height: auto;
  min-height: var(--header-height);
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-primary);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  height: var(--header-height);
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
}

.header-left {
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.header-logo-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: var(--brand-primary);
}

.services-filter {
  @media (max-width: 768px) {
    display: none;
  }
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.app-version {
  font-size: 0.875rem;
  color: var(--text-tertiary);
  font-weight: 500;
}

.services-section {
  padding: 0 1.5rem 1rem;
  border-top: 1px solid var(--border-primary);
  
  @media (max-width: 768px) {
    padding: 0 1rem 1rem;
  }
}

// Dark theme adjustments
body[theme='dark'] {
  .app-header {
    background: var(--bg-secondary);
    border-bottom-color: var(--border-secondary);
  }
}
</style>
