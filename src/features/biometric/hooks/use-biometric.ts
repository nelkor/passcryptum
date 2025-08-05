import { ref, computed } from 'vue';
import { removeBiometric } from '#/core';
import { initBiometric, setupBiometricAuth } from '../lib/setup-biometric';
import { authenticateWithBiometric } from '../lib/authenticate-biometric';

// Состояние биометрической аутентификации
export const biometricAvailable = ref(false);
export const biometricSetup = ref(false);
export const biometricLoading = ref(false);

// Состояние модальных окон
export const showSetupBiometricModal = ref(false);

/**
 * Хук для инициализации биометрии
 */
export const useBiometricInit = () => {
  const initialize = async () => {
    const { available, setup } = await initBiometric();
    biometricAvailable.value = available;
    biometricSetup.value = setup;
  };

  return { initialize };
};

/**
 * Хук для настройки биометрии
 */
export const useBiometricSetup = () => {
  const setup = async () => {
    biometricLoading.value = true;
    
    try {
      await setupBiometricAuth();
      biometricSetup.value = true;
    } finally {
      biometricLoading.value = false;
    }
  };

  return { setup };
};

/**
 * Хук для аутентификации биометрии
 */
export const useBiometricAuth = () => {
  const authenticate = async () => {
    biometricLoading.value = true;
    
    try {
      const result = await authenticateWithBiometric();
      return result;
    } finally {
      biometricLoading.value = false;
    }
  };

  return { authenticate };
};

/**
 * Хук для удаления биометрии
 */
export const useBiometricRemove = () => {
  const remove = () => {
    removeBiometric();
    biometricSetup.value = false;
  };

  return { remove };
};

// Вычисляемые свойства
export const canUseBiometric = computed(() => 
  biometricAvailable.value && biometricSetup.value
);

export const canSetupBiometric = computed(() => 
  biometricAvailable.value && !biometricSetup.value
); 