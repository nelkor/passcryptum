<script setup lang="ts">
import { ref } from 'vue'

import { addServiceAndLogin } from '@/entities/session'

const serviceName = ref('')
const loginName = ref('')

const onSubmit = () => {
  addServiceAndLogin(serviceName.value, loginName.value)

  serviceName.value = ''
  loginName.value = ''
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <input v-model="serviceName" type="text" placeholder="Service name" />
    <input v-model="loginName" type="text" placeholder="Login" />
    <button :disabled="!serviceName">Add</button>
  </form>
</template>
