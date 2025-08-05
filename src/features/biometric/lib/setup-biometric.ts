import { 
  checkBiometricAvailability, 
  setupBiometric,
  isBiometricSetup
} from '#/core';

/**
 * Инициализация биометрической аутентификации
 */
export const initBiometric = async () => {
  try {
    const available = await checkBiometricAvailability();
    const setup = isBiometricSetup();
    
    return {
      available,
      setup
    };
  } catch (error) {
    console.warn('Biometric initialization failed:', error);
    return {
      available: false,
      setup: false
    };
  }
};

/**
 * Настройка биометрической аутентификации
 */
export const setupBiometricAuth = async () => {
  try {
    await setupBiometric();
    return true;
  } catch (error) {
    console.error('Failed to setup biometric:', error);
    throw error;
  }
}; 