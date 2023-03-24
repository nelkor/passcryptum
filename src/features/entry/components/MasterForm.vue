<script setup lang="ts">
import { useMasterForm } from '../hooks/master-form'

const { masterPassword, isSubmitDisabled, onSubmit } = useMasterForm()
</script>

<template>
  <form @submit.prevent="onSubmit">
    <input v-model="masterPassword" type="password" />
    <button type="submit" :disabled="isSubmitDisabled">Enter</button>
  </form>
</template>
