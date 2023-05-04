<script setup lang="ts">
import { useLoginAdder } from '../hooks/login-adder'
import { injectService } from '../providers/service'

const service = injectService()
const { newLogin, isSubmitDisabled, onSubmit } = useLoginAdder(service)
</script>

<template>
  <form @submit.prevent="onSubmit">
    <input v-model="newLogin" type="text" placeholder="Enter login" />
    <button :disabled="isSubmitDisabled" type="submit">Add login</button>
  </form>
</template>
