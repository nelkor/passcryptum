# Biometric Authentication Module

Модуль для биометрической аутентификации с использованием WebAuthn API.

## Структура

```
biometric/
├── lib/
│   ├── biometric-auth.ts      # Основная логика аутентификации
│   ├── biometric-storage.ts   # Хранение биометрических данных
│   └── webauthn.ts           # Интеграция с WebAuthn API
└── index.ts                  # Публичный API модуля
```

## API

### `checkBiometricAvailability(): Promise<boolean>`
Проверяет доступность биометрической аутентификации на устройстве.

### `setupBiometric(): Promise<void>`
Настраивает биометрическую аутентификацию для пользователя.

### `authenticateBiometric(): Promise<{ id: string; data: string | null }>`
Выполняет аутентификацию с помощью биометрии.

### `removeBiometric(): void`
Удаляет настройки биометрической аутентификации.

### `isBiometricSetup(): boolean`
Проверяет, настроена ли биометрическая аутентификация.

## Использование

```typescript
import { 
  checkBiometricAvailability,
  setupBiometric,
  authenticateBiometric 
} from '#/core';

// Проверка доступности
const available = await checkBiometricAvailability();

// Настройка
await setupBiometric();

// Аутентификация
const result = await authenticateBiometric();
```

## Зависимости

- `session` - для работы с сессиями
- `shared` - для утилит форматирования 