<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { NSpace, NInput, NIcon, NButton } from 'naive-ui';
import { KeyOutline, LogInOutline, EyeOutline, EyeOffOutline } from '@vicons/ionicons5';

import { createElementRef } from '@/shared';

defineProps<{
  placeholder: string;
  disabled?: boolean;
}>();

const secret = ref('');
const showPassword = ref(false);
const emit = defineEmits(['enter']);
const inputElement = createElementRef<HTMLInputElement>();

const onSubmit = () => {
  emit('enter', secret.value);
  secret.value = '';
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

onMounted(() => {
  inputElement.value?.focus();
});
</script>

<template>
  <form @submit.prevent="onSubmit" class="login-form">
    <NSpace vertical size="large">
      <div class="input-container">
        <NInput
          ref="inputElement"
          v-model:value="secret"
          size="large"
          :type="showPassword ? 'text' : 'password'"
          :disabled="disabled"
          :placeholder="placeholder"
          :input-props="{ name: placeholder }"
          class="modern-input"
        >
          <template #prefix>
            <NIcon :component="KeyOutline" class="input-icon" />
          </template>
          
          <template #suffix>
            <NButton
              quaternary
              size="small"
              @click="togglePasswordVisibility"
              class="password-toggle"
            >
              <NIcon :component="showPassword ? EyeOffOutline : EyeOutline" />
            </NButton>
          </template>
        </NInput>
      </div>

      <NButton
        type="primary"
        size="large"
        :disabled="disabled || !secret"
        @click="onSubmit"
        class="submit-button modern-button"
        block
      >
        <template #icon>
          <NIcon :component="LogInOutline" />
        </template>
        Sign In
      </NButton>
    </NSpace>
  </form>
</template>

<style scoped lang="scss">
.login-form {
  .input-container {
    position: relative;
  }

  .input-icon {
    color: var(--text-tertiary);
  }

  .password-toggle {
    color: var(--text-tertiary);
    transition: color 0.2s ease;
    
    &:hover {
      color: var(--text-primary);
    }
  }

  .submit-button {
    height: 48px;
    font-weight: 600;
    font-size: 1rem;
    background: linear-gradient(135deg, var(--brand-primary), var(--brand-secondary));
    border: none;
    
    &:hover {
      background: linear-gradient(135deg, var(--brand-secondary), var(--brand-primary));
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg);
    }
    
    &:disabled {
      background: var(--neutral-300);
      transform: none;
      box-shadow: none;
    }
  }

  :deep(.n-input) {
    .n-input__input {
      font-size: 1rem;
      padding: 12px 16px;
    }
    
    .n-input__border {
      border-color: var(--border-primary);
      transition: all 0.2s ease;
    }
    
    .n-input__state-border {
      border-color: var(--border-focus);
    }
    
    &:focus-within {
      .n-input__border {
        border-color: var(--border-focus);
        box-shadow: 0 0 0 3px rgb(14 165 233 / 0.1);
      }
    }
  }
}

// Dark theme adjustments
body[theme='dark'] {
  .login-form {
    .submit-button {
      &:disabled {
        background: var(--neutral-600);
      }
    }
  }
}
</style>
