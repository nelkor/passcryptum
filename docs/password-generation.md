# Password generation algorithm

Here we are going to take into consideration the password generation algorithm
which is used in Passcryptum. In order to understand it in a deep level,
you will have to study the code fragments written in JavaScript.
If you don't want to dig so deep and understand all the subtleties,
it will be enough to read the description.

We also recommend to try to paste into the browser console all the code
fragments from this article and see the result. You can change the benchmark
data value in the first code fragment to your own ones and be sure that
the algorithm will generate exactly the same password
which will be generated by Passcryptum with the same benchmark data.

```javascript
const originPassword = '123456'
const serviceName = 'github.com'
const login = 'nelkor'
const version = 1
const length = 20
const useSymbols = true
```

## Origin entropy

It all starts when we enter the origin password. The application calculates
the 128 bytes long data buffer by the cryptographic algorithm PBKDF2.
This algorithm has adjustable difficulty, so you can choose the quantity
of the data shuffle iterations, after which the result is received.

For the origin entropy the quantity of iterations is 262144.
It is quite a large number, and it will make the task of brute-forcing
another person's origin password more complicated. Still, we can't increase
this number without limits, as the users with weak devices will face
some delay while logging in the system.

```javascript
const originBuffer = new TextEncoder().encode(originPassword).buffer

Promise.all([
  crypto.subtle.importKey('raw', originBuffer, 'PBKDF2', false, ['deriveBits']),
  crypto.subtle.digest('SHA-256', originBuffer),
])
  .then(([key, salt]) =>
    crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        hash: 'SHA-512',
        salt,
        iterations: 262144,
      },
      key,
      1024,
    ),
  )
  .then(result => {
    window.keyBufferFromOriginPassword = result
  })
```

This buffer can be applied for different tasks.
We are only interested in one part of it,
the one which directly participates in the process of password generation.

```javascript
const entropyBuffer = keyBufferFromOriginPassword.slice(8, 80)
```

## Generation parameters

All other parameters (except for the origin password) which influence
the password generation to the account, need to be united in one string,
separated by a comma, in a certain order.

```javascript
const paramsString = [login, length, version, useSymbols, serviceName].join()
// e.g. 'nelkor,20,1,true,github.com'
```

## Merging buffers

We merge the origin entropy with the string parameters buffer.

```javascript
const paramsBuffer = new TextEncoder().encode(paramsString).buffer
const unitedBytesLength = entropyBuffer.byteLength + paramsBuffer.byteLength
const unitedBytes = new Uint8Array(unitedBytesLength)

unitedBytes.set(new Uint8Array(entropyBuffer), 0)
unitedBytes.set(new Uint8Array(paramsBuffer), entropyBuffer.byteLength)

const mergedBuffer = unitedBytes.buffer
```

## Password entropy

We shuffle the data from the merged buffer with the help of PBKDF2 algorithm.
This time the quantity of iterations is only 16. The key length is 64 bytes.

```javascript
Promise.all([
  crypto.subtle.importKey('raw', mergedBuffer, 'PBKDF2', false, ['deriveBits']),
  crypto.subtle.digest('SHA-256', mergedBuffer),
])
  .then(([key, salt]) =>
    crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        hash: 'SHA-512',
        salt,
        iterations: 16,
      },
      key,
      512,
    ),
  )
  .then(result => {
    window.passwordEntropyBuffer = result
  })
```

## Seeds

One seed is a number from 0 to 65535. We need as many of them as many symbols
in our password we want to have. We get them from the password entropy,
2 bytes each seed. Others are insignificant.

```javascript
const seeds = Array.from(new Uint16Array(passwordEntropyBuffer, 0, length))
```

## Charset

Passcryptum guaranties that there will be at least one figure, one lowercase
letter and one capital letter of the Latin alphabet.
If the box 'use special symbols' is checked for the service,
at least one special symbol will also be present.

It can be achieved by using the charset which consists of three parts:

```javascript
const charset = [
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  'abcdefghijklmnopqrstuvwxyz',
  '0123456789',
]
```

If we use special symbols, their set is additionally included into the charset.

```javascript
if (useSymbols) {
  charset.push('`!@#$%^&*()-_=+{[]};:"|/.,<>')
}
```

We'll be able to use guaranteed representatives from separate symbol groups:
a lowercase letter, a capital letter, a figure and a special symbol.
Other symbols in the password must be perfectly random;
they will be taken from the unified set.

```javascript
const charUnion = charset.join('')
```

## Stringification of the entropy

Every symbol in the password stems from the remainder of division of the seed
by the size of the group of symbols. A group of symbols may be both a separate
part of the set of symbols (e.g. ten figures) and the whole unified charset.
The remainder of division is used as an index in order to take
the symbol from the group.

First 3 or 4 seeds, depending on the usage of special symbols are transformed
to the representatives of separate groups of symbols. Other seeds
are transformed into random symbols from the unified set.

```javascript
const seedsLetters = seeds.map((seed, index) => {
  const letters = charset[index] || charUnion
  const char = letters.charAt(seed % letters.length)

  return { char, seed }
})
```

We have received the symbols which will be included into the password.
However, the guaranteed representatives of the groups are on the first
positions, which makes the password a little more predictable. In order
to get rid of this effect we will sort the prepared symbols in ascending
order of the value of the seeds from which they had been received.

```javascript
seedsLetters
  .sort((a, b) => a.seed - b.seed)
  .map(({ char }) => char)
  .join('')
```

If you used the same benchmark data which were pointed out in the beginning
of this article, you got the same password: `%wBF.hkoq;kT%0UmuUy2`.

## Summary

Passcryptum isn't a miracle worker.
The password generation is based on mathematical operations.

Even if the application disappears for some reason, all the passwords will be
possible to restore manually. But it will take too long to generate passwords
manually, so the Passcryptum interface will complete all the necessary
operations within a split second.
