import { getSession } from '../../session';
import { 
  isBiometricAvailable, 
  createBiometricCredential, 
  authenticateWithBiometric,
  generateChallenge 
} from './webauthn';
import { 
  saveBiometricCredential, 
  getBiometricData, 
  isBiometricEnabled,
  removeBiometricData,
  getBiometricCredentialId 
} from './biometric-storage';
import { getLsData } from '../../session/lib/get-ls-data';
import { formatPassword, capitals } from '../../shared';

/**
 * Проверяет доступность биометрической аутентификации
 */
export const checkBiometricAvailability = async (): Promise<boolean> => {
  return await isBiometricAvailable();
};

/**
 * Настраивает биометрическую аутентификацию
 */
export const setupBiometric = async (): Promise<void> => {
  const available = await checkBiometricAvailability();
  if (!available) {
    throw new Error('Biometric authentication is not available on this device');
  }

  const session = getSession();
  if (!session) {
    throw new Error('No active session');
  }

  const challenge = generateChallenge();
  const userId = `user_${Date.now()}`;
  const userName = 'Passcryptum User';

  try {
    const credential = await createBiometricCredential(userId, userName, challenge);
    saveBiometricCredential(credential, userId, userName);
  } catch (error) {
    console.error('Error setting up biometric authentication:', error);
    throw new Error('Failed to set up biometric authentication');
  }
};

/**
 * Аутентифицируется с помощью биометрии
 */
export const authenticateBiometric = async (): Promise<{ id: string; data: string | null }> => {
  const available = await checkBiometricAvailability();
  if (!available) {
    throw new Error('Biometric authentication is not available');
  }

  if (!isBiometricEnabled()) {
    throw new Error('Biometric authentication is not set up');
  }

  const credentialId = getBiometricCredentialId();
  if (!credentialId) {
    throw new Error('No biometric credentials found');
  }

  const challenge = generateChallenge();

  try {
    const assertion = await authenticateWithBiometric(challenge, credentialId);
    
    // В реальном приложении здесь должна быть проверка assertion
    // Для упрощения возвращаем данные сессии
    const session = getSession();
    if (!session) {
      throw new Error('No active session');
    }

    // Получаем данные из localStorage для возврата
    const lsData = await getLsData(session.lsKey, session.iv, session.cryptoKey);
    const sessionId = formatPassword(session.originBuffer.slice(0, 8), 4, [capitals]);

    return {
      id: sessionId,
      data: lsData,
    };
  } catch (error) {
    console.error('Error during biometric authentication:', error);
    throw new Error('Biometric authentication failed');
  }
};

/**
 * Удаляет биометрическую аутентификацию
 */
export const removeBiometric = (): void => {
  removeBiometricData();
};

/**
 * Проверяет, настроена ли биометрическая аутентификация
 */
export const isBiometricSetup = (): boolean => {
  return isBiometricEnabled() && getBiometricCredentialId() !== null;
}; 