// Re-export hooks and computed properties for backward compatibility
export * from './hooks/use-biometric';
export * from './lib/setup-biometric';
export * from './lib/authenticate-biometric';

// Legacy exports for backward compatibility
export { 
  biometricAvailable,
  biometricSetup,
  biometricLoading,
  showSetupBiometricModal,
  canUseBiometric,
  canSetupBiometric
} from './hooks/use-biometric';

export { 
  initBiometric,
  setupBiometricAuth
} from './lib/setup-biometric';

export { 
  authenticateWithBiometric
} from './lib/authenticate-biometric'; 