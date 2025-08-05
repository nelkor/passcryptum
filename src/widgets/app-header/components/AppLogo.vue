<script setup lang="ts">
import { NSpace, NText } from 'naive-ui';

import { LogoIcon } from '@/shared';
import { sessionId } from '@/entities/session';
</script>

<template>
  <div class="logo-container">
    <div class="logo-wrapper">
      <LogoIcon class="logo-svg" />
    </div>

    <NText class="logo-text">
      <span v-if="sessionId" class="session-id">{{ sessionId }}</span>
      <span v-else class="app-name text-gradient">Passcryptum</span>
    </NText>
  </div>
</template>

<style scoped lang="scss">
.logo-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 6px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-primary);
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: var(--shadow-sm);
  }
}

.logo-svg {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--brand-primary);
}

.logo-text {
  font-weight: 600;
  font-size: 1.125rem;
  
  .session-id {
    color: var(--text-primary);
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 0.875rem;
  }
  
  .app-name {
    font-size: 1.25rem;
    font-weight: 700;
  }
}

// Dark theme adjustments
body[theme='dark'] {
  .logo-wrapper {
    background: var(--bg-secondary);
    border-color: var(--border-secondary);
  }
}
</style>
