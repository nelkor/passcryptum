<script setup lang="ts">
import { LoginPage } from '@/pages/login'
import { WorkPage } from '@/pages/work'
import { sessionId } from '@/entities/session'
</script>

<template>
  <WorkPage v-if="sessionId" />
  <LoginPage v-else />
</template>
