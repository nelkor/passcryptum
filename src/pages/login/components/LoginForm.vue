<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { NSpace, NInput, NIcon } from 'naive-ui'
import { KeyOutline, LogInOutline } from '@vicons/ionicons5'

import { createElementRef, FormSubmit } from '@/shared'

defineProps<{
  placeholder: string
  disabled?: boolean
}>()

const secret = ref('')
const emit = defineEmits(['enter'])
const inputElement = createElementRef<HTMLInputElement>()

const onSubmit = () => {
  emit('enter', secret.value)

  secret.value = ''
}

onMounted(() => {
  inputElement.value.focus()
})
</script>

<template>
  <form @submit.prevent="onSubmit">
    <NSpace vertical size="large">
      <NInput
        ref="inputElement"
        v-model:value="secret"
        size="large"
        type="password"
        :disabled="disabled"
        :placeholder="placeholder"
        show-password-on="mousedown"
        :input-props="{ name: placeholder }"
      >
        <template #prefix>
          <NIcon :component="KeyOutline" />
        </template>
      </NInput>

      <FormSubmit :disabled="disabled || !secret">
        <template #icon>
          <LogInOutline />
        </template>
      </FormSubmit>
    </NSpace>
  </form>
</template>
