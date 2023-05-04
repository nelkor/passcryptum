<script setup lang="ts">
import { WorkScreen } from '@/pages/work-screen'
import { PasswordEntry } from '@/pages/password-entry'
import { isMasterEntered } from '@/entities/master-tool'
</script>

<template>
  <WorkScreen v-if="isMasterEntered" />
  <PasswordEntry v-else />
</template>
