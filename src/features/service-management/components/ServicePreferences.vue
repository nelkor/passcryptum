<script setup lang="ts">
import { computed } from 'vue'

import { ServiceData } from '@/entities/services-config'
import { PasswordLengthGroup } from '@/shared'

import { useServicePreferences } from '../hooks/service-preferences'

const props = defineProps<{ service: ServiceData }>()
const emit = defineEmits(['update-preferences'])

const { innerService } = useServicePreferences(
  computed(() => props.service),
  emit
)
</script>

<template>
  <label>
    <input v-model="innerService.useSpecialCharacters" type="checkbox" />
    <span>Use special characters</span>
  </label>

  <hr />
  <PasswordLengthGroup v-model="innerService.passwordLengthIndex" />
</template>
