<script setup lang="ts">
import { useAddCustomService } from '../hooks/add-custom-service'

const { serviceName, isSubmitDisabled, onSubmit } = useAddCustomService()
</script>

<template>
  <form @submit.prevent="onSubmit">
    <input v-model="serviceName" type="text" placeholder="Enter service name" />
    <button type="submit" :disabled="isSubmitDisabled">Add</button>
  </form>
</template>
