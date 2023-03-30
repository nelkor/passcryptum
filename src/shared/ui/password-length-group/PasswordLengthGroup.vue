<script setup lang="ts">
defineProps<{ modelValue: number }>()

const emit = defineEmits(['update:modelValue'])
const passwordLengthVariants = [8, 12, 20, 32]
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
