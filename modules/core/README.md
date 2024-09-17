# Passcryptum core

This package contains all the cryptographic functionality of Passcryptum.
Its creation is motivated by the intention of separating this logic from
the one of the application interface. Being separated, this functionality
doesn't depend on the interface framework or gets confused with the off-side
areas of responsibility.

## Logging in and out

All the functionality of the Passcryptum core is built on cryptographic data
received from the origin password. By 'logging in' we mean getting these data
by the Passcryptum core (the start of an active session). Thus, 'logging out'
means deletion of these data from the RAM (the end of an active session).

Starting the session, the Passcryptum core client receives the session ID
(a string, four Latin letters), and saved data for this session
(a custom string, e.g. JSON).

### Logging in using an origin password

```typescript
declare const enterWithOriginPassword: (
  password: string,
) => Promise<{ id: string; data: string | null }>
```

Takes string (origin password), launches the session.
Returns the object asynchronously with the identifier and the data.
Slow cryptography is used, calculation may take some time.

### Logging in using PIN

```typescript
declare const enterWithPin: (
  pin: string,
) => Promise<{ id: string; data: string | null }>
```

Takes string (PIN). Searches for the encrypted hash of the origin password
in the local storage and tries to decrypt it. Slow cryptography is used,
calculation may take some time. If unsuccessful, throws an exception.
Launches the session.
Returns the object asynchronously with the identifier and the data.

### Logging out

```typescript
declare const exit: () => void
```

Ends the session. All the functions depending on the session data stop working
(start throwing an exception).

## Data keeping

### Data saving

```typescript
declare const saveData: (data: string) => Promise<void>
```

Throws an exception if the session is inactive.

Takes the string (e.g. JSON). The string is encrypted by the active session data
and saves into the local storage.

### Reading the encrypted data

```typescript
declare const readData: (data: string | ArrayBuffer) => Promise<string | null>
```

Throws an exception if the session is inactive.

Takes a string or a buffer. Tries to decipher it with the active session data.
If unsuccessful, returns `null`.
Returns decrypted data of the passed argument as a string.

### Getting data

```typescript
declare const getDataAsBuffer: () => Promise<ArrayBuffer | null>
declare const getDataAsString: () => Promise<string | null>
declare const getDataDecrypted: () => Promise<string | null>
```

Throws an exception if the session is inactive.

First two functions return encrypted data saved to the local storage
with the active session key. The type of returned data differs:

- `getDataAsBuffer` — binary view;
- `getDataAsString` — hex string.

The last function `getDataDecrypted` returns the decrypted data string.

### Deleting data

```typescript
declare const deleteData: () => void
```

Throws an exception if the session is inactive.

Deletes data saved into the local storage with the active session key.

## PIN

### PIN status check

```typescript
declare const isTherePin: () => boolean
```

Returns `true` if the PIN is set, otherwise returns `false`.

### PIN setting

```typescript
declare const setPin: (pin: string) => Promise<void>
```

Throws an exception if the session is inactive.

Sets the passed PIN and writes it into the local storage.

### PIN deletion

```typescript
declare const deletePin: () => void
```

Deletes PIN.

## Password generation

```typescript
declare const generatePassword: (
  serviceName: string,
  login: string,
  version: number,
  useSymbols: boolean,
  length: number,
) => Promise<string>
```

Throws an exception if the session is inactive.

Calculates the password on the basis of the current session and passed parameters.
