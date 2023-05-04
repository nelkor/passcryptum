<script setup lang="ts">
import { useMasterForm } from '../hooks/master-form'

const { masterPassword, isSubmitDisabled, inputElement, onSubmit } =
  useMasterForm()
</script>

<template>
  <form @submit.prevent="onSubmit">
    <input ref="inputElement" v-model="masterPassword" type="password" />
    <button type="submit" :disabled="isSubmitDisabled">Enter</button>
  </form>
</template>
