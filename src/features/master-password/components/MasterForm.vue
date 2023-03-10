<script setup lang="ts">
import { useMasterForm } from '../hooks/master-form.hook'

const { masterPassword, isSubmitDisabled, onSubmit } = useMasterForm()
</script>

<template>
  <form @submit.prevent="onSubmit">
    <input v-model="masterPassword" type="password" />
    <input type="submit" value="Enter" :disabled="isSubmitDisabled" />
  </form>
</template>
