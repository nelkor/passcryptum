<script setup lang="ts">
import { ref } from 'vue'
import {
  AppsOutline,
  AddCircleOutline,
  PersonAddOutline,
  CloseOutline,
} from '@vicons/ionicons5'
import { NIcon, NModal, NSpace, NInput, NButton, NText, NDivider, useLoadingBar } from 'naive-ui'

import { addServiceAndLogin, isCalculationInProgress } from '@/entities/session'

import { showAddServiceModal } from '../model'

const serviceName = ref('')
const loginName = ref('')
const loadingBar = useLoadingBar()

const clearForm = () => {
  loginName.value = ''
  serviceName.value = ''
}

const onSubmit = () => {
  loadingBar.start()

  addServiceAndLogin(serviceName.value, loginName.value).then(() => {
    loadingBar.finish()

    showAddServiceModal.value = false
    isCalculationInProgress.value = false
  })

  clearForm()

  isCalculationInProgress.value = true
}

const closeModal = () => {
  showAddServiceModal.value = false
  clearForm()
}
</script>

<template>
  <NModal
    v-model:show="showAddServiceModal"
    preset="card"
    class="add-service-modal modern-modal"
    :show-close="false"
    :mask-closable="false"
    @after-leave="clearForm"
  >
    <!-- Header -->
    <div class="modal-header">
      <NText class="modal-title">
        Add New Service
      </NText>
      <NButton
        quaternary
        size="small"
        class="close-button"
        @click="closeModal"
      >
        <template #icon>
          <NIcon :component="CloseOutline" />
        </template>
      </NButton>
    </div>

    <NDivider />

    <!-- Content -->
    <div class="modal-content">
      <form @submit.prevent="onSubmit">
        <NSpace vertical size="large">
          <!-- Service Name Input -->
          <div class="input-group">
            <NText class="input-label">Service Name</NText>
            <NInput
              v-model:value="serviceName"
              size="large"
              placeholder="Enter service name"
              :input-props="{ name: 'Service' }"
              :disabled="isCalculationInProgress"
              class="modern-input"
            >
              <template #prefix>
                <NIcon :component="AppsOutline" class="input-icon" />
              </template>
            </NInput>
          </div>

          <!-- Login Input -->
          <div class="input-group">
            <NText class="input-label">Login</NText>
            <NInput
              v-model:value="loginName"
              size="large"
              placeholder="Enter login"
              :input-props="{ name: 'Login' }"
              :disabled="isCalculationInProgress"
              class="modern-input"
            >
              <template #prefix>
                <NIcon :component="PersonAddOutline" class="input-icon" />
              </template>
            </NInput>
          </div>

          <!-- Submit Button -->
          <NButton
            type="primary"
            size="large"
            :disabled="!serviceName || isCalculationInProgress"
            @click="onSubmit"
            class="submit-button modern-button"
            block
          >
            <template #icon>
              <NIcon :component="AddCircleOutline" />
            </template>
            Add Service
          </NButton>
        </NSpace>
      </form>
    </div>
  </NModal>
</template>

<style scoped lang="scss">
.add-service-modal {
  max-width: 480px;
  width: 90vw;
  
  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0;
    margin-bottom: 1rem;
    
    .modal-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-primary);
    }
    
    .close-button {
      color: var(--text-tertiary);
      transition: color 0.2s ease;
      
      &:hover {
        color: var(--text-primary);
      }
    }
  }
  
  .modal-content {
    padding: 0;
    
    .input-group {
      .input-label {
        font-weight: 500;
        color: var(--text-primary);
        margin-bottom: 0.5rem;
        display: block;
      }
      
      .modern-input {
        :deep(.n-input__input) {
          font-size: 1rem;
          padding: 12px 16px;
        }
        
        .input-icon {
          color: var(--text-tertiary);
        }
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
  }
}

// Dark theme adjustments
body[theme='dark'] {
  .add-service-modal {
    .submit-button {
      &:disabled {
        background: var(--neutral-600);
      }
    }
  }
}
</style>
