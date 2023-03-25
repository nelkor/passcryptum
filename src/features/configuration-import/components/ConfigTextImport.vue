<script setup lang="ts">
import { useTextImport } from '../hooks/text-import'

const { inputString, isSubmitDisabled, onSubmit } = useTextImport()
</script>

<template>
  <h4>Configuration text import</h4>

  <form @submit.prevent="onSubmit">
    <input
      v-model="inputString"
      type="text"
      placeholder="Paste configuration text"
    />

    <button type="submit" :disabled="isSubmitDisabled">Import</button>
  </form>
</template>
