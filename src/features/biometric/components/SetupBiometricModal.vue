<script setup lang="ts">
import { ref } from 'vue';
import { 
  NModal, 
  NSpace, 
  NButton, 
  NText,
  useMessage,
  useLoadingBar 
} from 'naive-ui';
import { FingerPrintOutline, CloseOutline } from '@vicons/ionicons5';

import { 
  showSetupBiometricModal,
  biometricLoading 
} from '../model';
import { useBiometricSetup } from '../hooks/use-biometric';

const message = useMessage();
const loadingBar = useLoadingBar();

const { setup } = useBiometricSetup();

const onSetup = async () => {
  loadingBar.start();
  
  try {
    await setup();
    message.success('Biometric authentication has been set up successfully');
    showSetupBiometricModal.value = false;
  } catch (error) {
    message.error('Failed to set up biometric authentication');
    console.error('Setup biometric error:', error);
  } finally {
    loadingBar.finish();
  }
};

const onCancel = () => {
  showSetupBiometricModal.value = false;
};
</script>

<template>
  <NModal
    v-model:show="showSetupBiometricModal"
    preset="card"
    class="app-modal"
    title="Setup Biometric Authentication"
    @after-leave="onCancel"
  >
    <NSpace vertical size="large">
      <NText>
        Set up Touch ID, Face ID, or fingerprint authentication for quick and secure access to your passwords.
      </NText>
      
      <NText type="info">
        This will allow you to use your device's biometric authentication instead of entering a PIN.
      </NText>

      <NSpace justify="end">
        <NButton 
          @click="onCancel"
          :disabled="biometricLoading"
        >
          <template #icon>
            <CloseOutline />
          </template>
          Cancel
        </NButton>
        
        <NButton 
          type="primary"
          :loading="biometricLoading"
          @click="onSetup"
        >
          <template #icon>
            <FingerPrintOutline />
          </template>
          Setup Biometric
        </NButton>
      </NSpace>
    </NSpace>
  </NModal>
</template> 