<script setup lang="ts">
import { useServiceAdder } from '../hooks/service-adder'

const { serviceName, isSubmitDisabled, onSubmit } = useServiceAdder()
</script>

<template>
  <h4>Add a service</h4>

  <form @submit.prevent="onSubmit">
    <input v-model="serviceName" type="text" placeholder="Enter service name" />
    <button type="submit" :disabled="isSubmitDisabled">Add</button>
  </form>
</template>
