<script setup lang="ts">
import LoginItem from './LoginItem.vue'
import { injectService } from '../providers/service'

const service = injectService()
</script>

<template>
  <ul>
    <LoginItem
      v-for="login in service.logins"
      :key="login.name"
      :login="login"
    />
  </ul>
</template>
