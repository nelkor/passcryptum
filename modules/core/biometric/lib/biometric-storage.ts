import { BiometricCredential } from './webauthn';

const LS_KEY_BIOMETRIC_CREDENTIAL = 'passcryptum_biometric_credential';
const LS_KEY_BIOMETRIC_ENABLED = 'passcryptum_biometric_enabled';

export interface BiometricData {
  credentialId: string;
  userId: string;
  userName: string;
  createdAt: number;
}

/**
 * Сохраняет биометрические учетные данные
 */
export const saveBiometricCredential = (credential: BiometricCredential, userId: string, userName: string): void => {
  const data: BiometricData = {
    credentialId: credential.id,
    userId,
    userName,
    createdAt: Date.now(),
  };

  localStorage.setItem(LS_KEY_BIOMETRIC_CREDENTIAL, JSON.stringify(data));
  localStorage.setItem(LS_KEY_BIOMETRIC_ENABLED, 'true');
};

/**
 * Получает сохраненные биометрические данные
 */
export const getBiometricData = (): BiometricData | null => {
  try {
    const data = localStorage.getItem(LS_KEY_BIOMETRIC_CREDENTIAL);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error reading biometric data:', error);
    return null;
  }
};

/**
 * Проверяет, включена ли биометрическая аутентификация
 */
export const isBiometricEnabled = (): boolean => {
  return localStorage.getItem(LS_KEY_BIOMETRIC_ENABLED) === 'true';
};

/**
 * Удаляет биометрические данные
 */
export const removeBiometricData = (): void => {
  localStorage.removeItem(LS_KEY_BIOMETRIC_CREDENTIAL);
  localStorage.removeItem(LS_KEY_BIOMETRIC_ENABLED);
};

/**
 * Получает ID сохраненных учетных данных
 */
export const getBiometricCredentialId = (): string | null => {
  const data = getBiometricData();
  return data?.credentialId || null;
}; 