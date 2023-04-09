<script setup lang="ts">
import { PasswordLengthGroup } from '@/shared'

import { useServicePreferences } from '../hooks/service-preferences'
import { injectService } from '../providers/service'

const emit = defineEmits(['update-preferences'])
const service = injectService()
const { innerService } = useServicePreferences(service, emit)
</script>

<template>
  <label>
    <input v-model="innerService.useSpecialCharacters" type="checkbox" />
    <span>Use special characters</span>
  </label>

  <hr />
  <PasswordLengthGroup v-model="innerService.passwordLengthIndex" />
</template>
