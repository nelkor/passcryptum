<script setup lang="ts">
import { useTextImport } from '../hooks/text-import'

const { inputString, isSubmitDisabled, onSubmit } = useTextImport()
</script>

<template>
  <form class="config-text-import" @submit.prevent="onSubmit">
    <input
      v-model="inputString"
      class="text-input aside__input config-text-import__input"
      type="text"
      placeholder="Import from text"
    />

    <button
      class="app-button app-button__common config-text-import__submit"
      type="submit"
      :disabled="isSubmitDisabled"
    >
      Import
    </button>
  </form>
</template>
