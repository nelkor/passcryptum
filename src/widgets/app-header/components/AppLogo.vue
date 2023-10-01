<script setup lang="ts">
import { NSpace, NText } from 'naive-ui'

import { LogoIcon } from '@/shared'
import { sessionId } from '@/entities/session'
</script>

<template>
  <NSpace size="small" align="center">
    <div class="logo-wrapper">
      <LogoIcon class="logo-svg" />
    </div>

    <NText class="logo-text">{{ sessionId || 'Passcryptum' }}</NText>
  </NSpace>
</template>
