import { authenticateBiometric } from '#/core';

/**
 * Аутентификация с помощью биометрии
 */
export const authenticateWithBiometric = async () => {
  try {
    const result = await authenticateBiometric();
    return result;
  } catch (error) {
    console.error('Biometric authentication failed:', error);
    throw error;
  }
}; 