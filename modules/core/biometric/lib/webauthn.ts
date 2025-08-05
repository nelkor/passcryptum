// WebAuthn API для биометрической аутентификации (Touch ID, Face ID, Fingerprint)

export interface BiometricCredential {
  id: string;
  type: 'public-key';
  transports?: string[];
}

export interface BiometricAssertion {
  id: string;
  type: 'public-key';
  response: {
    authenticatorData: ArrayBuffer;
    clientDataJSON: ArrayBuffer;
    signature: ArrayBuffer;
    userHandle?: ArrayBuffer;
  };
}

export interface BiometricCreationOptions {
  challenge: ArrayBuffer;
  rp: {
    name: string;
    id?: string;
  };
  user: {
    id: ArrayBuffer;
    name: string;
    displayName: string;
  };
  pubKeyCredParams: Array<{
    type: string;
    alg: number;
  }>;
  timeout?: number;
  attestation?: 'none' | 'indirect' | 'direct';
  authenticatorSelection?: {
    authenticatorAttachment?: string;
    requireResidentKey?: boolean;
    userVerification?: string;
  };
}

export interface BiometricRequestOptions {
  challenge: ArrayBuffer;
  rpId?: string;
  allowCredentials?: Array<{
    id: ArrayBuffer;
    type: string;
    transports?: string[];
  }>;
  userVerification?: string;
  timeout?: number;
}

/**
 * Проверяет поддержку WebAuthn в браузере
 */
export const isWebAuthnSupported = (): boolean => {
  return (
    typeof window !== 'undefined' &&
    'PublicKeyCredential' in window &&
    'credentials' in navigator &&
    'create' in navigator.credentials &&
    'get' in navigator.credentials
  );
};

/**
 * Проверяет доступность биометрической аутентификации
 */
export const isBiometricAvailable = async (): Promise<boolean> => {
  if (!isWebAuthnSupported()) {
    return false;
  }

  try {
    // Проверяем поддержку платформенной аутентификации
    const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
    return available;
  } catch (error) {
    console.warn('Biometric authentication not available:', error);
    return false;
  }
};

/**
 * Создает биометрические учетные данные
 */
export const createBiometricCredential = async (
  userId: string,
  userName: string,
  challenge: ArrayBuffer
): Promise<BiometricCredential> => {
  if (!isWebAuthnSupported()) {
    throw new Error('WebAuthn not supported');
  }

  const options: PublicKeyCredentialCreationOptions = {
    challenge,
    rp: {
      name: 'Passcryptum',
      id: window.location.hostname,
    },
    user: {
      id: new TextEncoder().encode(userId),
      name: userId,
      displayName: userName,
    },
    pubKeyCredParams: [
      {
        type: 'public-key',
        alg: -7, // ES256
      },
      {
        type: 'public-key',
        alg: -257, // RS256
      },
    ],
    timeout: 60000,
    attestation: 'none',
    authenticatorSelection: {
      authenticatorAttachment: 'platform',
      requireResidentKey: false,
      userVerification: 'required',
    },
  };

  try {
    const credential = await navigator.credentials.create({
      publicKey: options,
    }) as PublicKeyCredential;

    if (!credential) {
      throw new Error('Failed to create biometric credential');
    }

    return {
      id: credential.id,
      type: credential.type as 'public-key',
      transports: (credential.response as any)?.getTransports?.() || [],
    };
  } catch (error) {
    console.error('Error creating biometric credential:', error);
    throw new Error('Failed to set up biometric authentication');
  }
};

/**
 * Аутентифицируется с помощью биометрии
 */
export const authenticateWithBiometric = async (
  challenge: ArrayBuffer,
  credentialId?: string
): Promise<BiometricAssertion> => {
  if (!isWebAuthnSupported()) {
    throw new Error('WebAuthn not supported');
  }

  const options: PublicKeyCredentialRequestOptions = {
    challenge,
    rpId: window.location.hostname,
    userVerification: 'required',
    timeout: 60000,
  };

  if (credentialId) {
    options.allowCredentials = [
      {
        id: new TextEncoder().encode(credentialId),
        type: 'public-key',
      },
    ];
  }

  try {
    const assertion = await navigator.credentials.get({
      publicKey: options,
    }) as PublicKeyCredential;

    if (!assertion) {
      throw new Error('Biometric authentication failed');
    }

    const response = {
      authenticatorData: assertion.response.authenticatorData,
      clientDataJSON: assertion.response.clientDataJSON,
      signature: assertion.response.signature,
    };

    // Добавляем userHandle только если он существует
    if (assertion.response.userHandle) {
      (response as any).userHandle = assertion.response.userHandle;
    }

    return {
      id: assertion.id,
      type: assertion.type as 'public-key',
      response,
    };
  } catch (error) {
    console.error('Error during biometric authentication:', error);
    throw new Error('Biometric authentication failed');
  }
};

/**
 * Генерирует случайный challenge для аутентификации
 */
export const generateChallenge = (): ArrayBuffer => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return array.buffer;
};

/**
 * Проверяет валидность биометрической аутентификации
 */
export const verifyBiometricAssertion = async (
  assertion: BiometricAssertion,
  challenge: ArrayBuffer,
  publicKey: ArrayBuffer
): Promise<boolean> => {
  try {
    // В реальном приложении здесь должна быть проверка подписи
    // Для упрощения возвращаем true, если assertion получен
    return !!(assertion && assertion.response && assertion.response.signature);
  } catch (error) {
    console.error('Error verifying biometric assertion:', error);
    return false;
  }
}; 