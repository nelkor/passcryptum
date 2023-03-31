<script setup lang="ts">
import { computed } from 'vue'

import type { ServiceData } from '@/entities/services-config'

import { useAddLoginToCustomService } from '../hooks/add-login-to-custom-service'

const props = defineProps<{ service: ServiceData }>()

const { newLogin, isSubmitDisabled, onSubmit } = useAddLoginToCustomService(
  computed(() => props.service)
)
</script>

<template>
  <form @submit.prevent="onSubmit">
    <input v-model="newLogin" type="text" placeholder="Enter login" />
    <button :disabled="isSubmitDisabled" type="submit">Add login</button>
  </form>
</template>
