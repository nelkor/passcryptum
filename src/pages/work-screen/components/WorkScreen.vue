<script setup lang="ts">
import { clearMasterPassword } from '@/entities/master-password'
</script>

<template>
  <h1>Work screen</h1>
  <button @click="clearMasterPassword">Exit</button>
</template>
