<script setup lang="ts">
import { passwordLengthVariants } from '../lib/password-length'
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
  <h5>Password length</h5>

  <form @submit.prevent>
    <label v-for="(variant, index) in passwordLengthVariants" :key="variant">
      <input
        v-model="innerService.passwordLengthIndex"
        name="password-length"
        type="radio"
        :value="index"
      />

      <span>{{ variant }}</span>
    </label>
  </form>
</template>
