# Passcryptum services

Данный пакет содержит функциональность по управлению конфигурацией сервисов
Passcryptum.

## Конвертация

### Чтение из строки

```typescript
declare const parse: (data: string) => ServicesConfig
```

Если переданная строка является сжатой конфигурацией сервисов, вернёт эту
конфигурацию сервисов. Вернёт пустую конфигурацию сервисов в противном случае.

### Приведение к строке

```typescript
declare const stringify: (data: ServicesConfig) => string
```

Сжимает конфигурацию сервисов в строку.

## Создание пустого множества сервисов

```typescript
declare const createEmptyServices: () => ServicesConfig
```

Создаёт пустую конфигурацию сервисов.

## Проверка множества сервисов на пустоту

```typescript
declare const checkForEmptiness: (config: ServicesConfig) => boolean
```

Вернёт `true`, если конфигурация пустая и `false` в противном случае.

## Длина пароля

Конфигурация хранит длину пароля, привязанную к сервису, как индекс одного из
четырёх возможных вариантов.

### Варианты длины пароля

```typescript
declare const passwordLengthVariants: readonly number[]
```

Список вариантов длины пароля. Доступен только для чтения.

## Слияние конфигураций

```typescript
declare const mergeConfigurations: (
  basis: ServicesConfig,
  added: ServicesConfig
) => ServicesConfig
```

Создаёт новую конфигурацию на основе переданных. В результат будут добавлены все
сервисы и логины из обеих конфигураций. Для одинаковых логинов с разными
версиями в результат войдёт старшая версия. Если есть разница в настройках
одного и того же сервиса, будут взяты настройки из второй конфигурации.

## Операции над сервисами

Пакет представляет набор процедур, каждая из которых принимает конфигурацию
сервисов и выполняет требуемую операцию. Процедуры ничего не возвращают,
изменения применяются к переданной конфигурации.

### Добавление сервиса/логина

```typescript
declare const add: (
  config: ServicesConfig,
  serviceName: string,
  loginName = ''
) => void
```

Выбросит исключение, если `serviceName` является пустой строкой.

Добавляет сервис с именем `serviceName`, если такого ещё нет. Если передан
`loginName`, новый сервис добавится сразу же с логином. Если сервис с именем
`serviceName` уже существует, к нему будет добавлен логин с именем `loginName`.

### Удаление логина

```typescript
declare const deleteLogin: (
  config: ServicesConfig,
  serviceName: string,
  loginName: string
) => void
```

Выбросит исключение, если сервис не существует.

Удаляет из сервиса логин с заданным именем, если он есть.

### Удаление сервиса

```typescript
declare const deleteService: (config: ServicesConfig, name: string) => void
```

Выбросит исключение, если сервис не существует.

Удаляет сервис с заданным именем.

### Обновление версии логина

```typescript
declare const updateVersionOfLogin: (
  config: ServicesConfig,
  serviceName: string,
  loginName: string,
  version: number
) => void
```

Выбросит исключение, если сервис или логин не существует.

Устанавливает заданному логину в заданном сервисе заданную версию.

### Обновление настроек сервиса

```typescript
declare const updateServicePreferences: (
  config: ServicesConfig,
  name: string,
  passwordLengthIndex: number,
  useSpecialCharacters: boolean
) => void
```

Выбросит исключение, если сервис не существует или если `passwordLengthIndex`
не является допустимым индексом варианта длины пароля.

Устанавливает заданному сервису индекс варианта длины пароля и флаг
использования специальных символов.
