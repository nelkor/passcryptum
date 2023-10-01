<script setup lang="ts">
import {
  NConfigProvider,
  NGlobalStyle,
  NLoadingBarProvider,
  NMessageProvider,
  NDialogProvider,
} from 'naive-ui'

import { theme } from '@/features/theme'
</script>

<template>
  <NConfigProvider :theme="theme">
    <NGlobalStyle />

    <NLoadingBarProvider>
      <NMessageProvider>
        <NDialogProvider>
          <slot />
        </NDialogProvider>
      </NMessageProvider>
    </NLoadingBarProvider>
  </NConfigProvider>
</template>
