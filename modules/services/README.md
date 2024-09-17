# Passcryptum services

This package contains the functionality of the Passcryptum service management.

## Conversion

### Reading from string

```typescript
declare const parse: (data: string) => ServicesConfig
```

If the passed string is a zipped service configuration, returns
this service configuration. Otherwise, returns empty services.

### Stringification

```typescript
declare const stringify: (data: ServicesConfig) => string
```

Zips the service configuration to the string.

## Creation of an empty set of services

```typescript
declare const createEmptyServices: () => ServicesConfig
```

Creates an empty services.

## Checking of set of services for emptiness

```typescript
declare const checkForEmptiness: (config: ServicesConfig) => boolean
```

Returns `true` if the services is empty. Otherwise, returns `false`.

## Password length

The configuration keeps the password length tied to the service
as an index of one of the four possible variants.

### Password length variants

```typescript
declare const passwordLengthVariants: readonly number[]
```

List of the password length variants, read-only.

## Configurations merge

```typescript
declare const mergeConfigurations: (
  basis: ServicesConfig,
  added: ServicesConfig,
) => ServicesConfig
```

Creates a new configuration on the basis of the passed ones. All the services
and logins from both configurations will be added to the result. Higher version
will be in the result for the same logins with different versions.
If there is a difference in settings of the same service,
the settings from the second configuration will be taken.

## Operations on services

This package provides a set of procedures, each of which takes
the services configuration and performs the demanded operation.
Procedures return nothing, changes are applied to the passed configuration.

### Adding a service/login

```typescript
declare const add: (
  config: ServicesConfig,
  serviceName: string,
  loginName = '',
) => void
```

Throws an exception if `serviceName` is an empty string.

Adds the `serviceName` if it doesn't exist yet. If `loginName` is passed,
the new service will be added with the login at once.
If `serviceName` already exists, `loginName` will be added to it.

### Deleting login

```typescript
declare const deleteLogin: (
  config: ServicesConfig,
  serviceName: string,
  loginName: string,
) => void
```

Throws an exception if the service doesn't exist.

Deletes a login with a given name if it exists.

### Deleting service

```typescript
declare const deleteService: (config: ServicesConfig, name: string) => void
```

Throws an exception if the service doesn't exist.

Deletes service with a given name.

### Updating the login version

```typescript
declare const updateVersionOfLogin: (
  config: ServicesConfig,
  serviceName: string,
  loginName: string,
  version: number,
) => void
```

Throws an exception if the service/login doesn't exist.

Sets a given version to a given login in a given service.

### Updating service settings

```typescript
declare const updateServicePreferences: (
  config: ServicesConfig,
  name: string,
  passwordLengthIndex: number,
  useSpecialCharacters: boolean,
) => void
```

Throws an exception if the service doesn't exist or if `passwordLengthIndex`
is an invalid index of the password length variant.

Sets the index of the password length variant
and the flag of special symbols usage to a given service.
