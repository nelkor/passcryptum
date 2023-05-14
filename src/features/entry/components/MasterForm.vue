<script setup lang="ts">
import { useMasterForm } from '../hooks/master-form'

const { masterPassword, isSubmitDisabled, inputElement, onSubmit } =
  useMasterForm()
</script>

<template>
  <form class="master-form" @submit.prevent="onSubmit">
    <input
      ref="inputElement"
      v-model="masterPassword"
      class="text-input master-form__input"
      type="password"
      placeholder="Your top secret is here"
    />

    <button
      class="app-button app-button__common master-form__submit"
      type="submit"
      :disabled="isSubmitDisabled"
    >
      Continue
    </button>
  </form>
</template>
