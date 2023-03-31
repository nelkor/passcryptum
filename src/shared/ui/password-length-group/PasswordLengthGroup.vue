<script setup lang="ts">
import { passwordLengthVariants } from '../../lib/password-length'

defineProps<{ modelValue: number }>()

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <h5>Password length</h5>

  <form @submit.prevent>
    <label v-for="(variant, index) in passwordLengthVariants" :key="variant">
      <input
        name="password-length"
        type="radio"
        :value="index"
        :checked="modelValue === index"
        @change="() => emit('update:modelValue', index)"
      />

      <span>{{ variant }}</span>
    </label>
  </form>
</template>
