import { ref, computed } from 'vue';
import { 
  checkBiometricAvailability, 
  isBiometricSetup,
  setupBiometric,
  authenticateBiometric,
  removeBiometric 
} from '#/core';

// Состояние биометрической аутентификации
export const biometricAvailable = ref(false);
export const biometricSetup = ref(false);
export const biometricLoading = ref(false);

// Состояние модальных окон
export const showSetupBiometricModal = ref(false);

// Проверяем доступность при инициализации
export const initBiometric = async () => {
  try {
    biometricAvailable.value = await checkBiometricAvailability();
    biometricSetup.value = isBiometricSetup();
  } catch (error) {
    console.warn('Biometric initialization failed:', error);
    biometricAvailable.value = false;
    biometricSetup.value = false;
  }
};

// Настройка биометрической аутентификации
export const setupBiometricAuth = async () => {
  biometricLoading.value = true;
  
  try {
    await setupBiometric();
    biometricSetup.value = true;
  } catch (error) {
    console.error('Failed to setup biometric:', error);
    throw error;
  } finally {
    biometricLoading.value = false;
  }
};

// Аутентификация с помощью биометрии
export const authenticateWithBiometric = async () => {
  biometricLoading.value = true;
  
  try {
    const result = await authenticateBiometric();
    return result;
  } catch (error) {
    console.error('Biometric authentication failed:', error);
    throw error;
  } finally {
    biometricLoading.value = false;
  }
};

// Удаление биометрической аутентификации
export const removeBiometricAuth = () => {
  removeBiometric();
  biometricSetup.value = false;
};

// Вычисляемые свойства
export const canUseBiometric = computed(() => 
  biometricAvailable.value && biometricSetup.value
);

export const canSetupBiometric = computed(() => 
  biometricAvailable.value && !biometricSetup.value
); 