/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// WebAuthn API types
interface PublicKeyCredential extends Credential {
  readonly id: string;
  readonly type: string;
  readonly response: AuthenticatorResponse;
}

interface AuthenticatorResponse {
  readonly clientDataJSON: ArrayBuffer;
  readonly authenticatorData: ArrayBuffer;
  readonly signature: ArrayBuffer;
  readonly userHandle?: ArrayBuffer;
}

interface AuthenticatorAttestationResponse extends AuthenticatorResponse {
  readonly attestationObject: ArrayBuffer;
}

interface AuthenticatorAssertionResponse extends AuthenticatorResponse {
  readonly authenticatorData: ArrayBuffer;
  readonly signature: ArrayBuffer;
  readonly userHandle?: ArrayBuffer;
}

interface PublicKeyCredentialCreationOptions {
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
  attestation?: string;
  authenticatorSelection?: {
    authenticatorAttachment?: string;
    requireResidentKey?: boolean;
    userVerification?: string;
  };
}

interface PublicKeyCredentialRequestOptions {
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

interface CredentialRequestOptions {
  publicKey?: PublicKeyCredentialRequestOptions;
}

interface CredentialCreationOptions {
  publicKey?: PublicKeyCredentialCreationOptions;
}

interface CredentialsContainer {
  create(options?: CredentialCreationOptions): Promise<Credential | null>;
  get(options?: CredentialRequestOptions): Promise<Credential | null>;
}

interface Navigator {
  credentials: CredentialsContainer;
}

declare class PublicKeyCredential {
  static isUserVerifyingPlatformAuthenticatorAvailable(): Promise<boolean>;
}

interface Window {
  PublicKeyCredential: typeof PublicKeyCredential;
}
