# Password generation algorithm

## Read in other languages

- [Russian](../ru/password-generation-algorithm.md)

## Foreword

Here we will look at the password generation algorithm used in Passcryptum.
In addition to theory, we will generate a password for the "nelkor" login in the
"github.com" service with the master password "123456" entered. To facilitate
manual work, we will choose a password length of 8 characters (minimum).
Leave the special characters enabled.

## Algorithm

### Master password

It all starts when we enter the master password. The app calculates
the SHA-512 hash[^1] of the entered password
and stores it in the browser's memory.

[^1]:
    To find out what a hash is, please read
    [Wikipedia article](https://en.wikipedia.org/wiki/Hash_function).

The algorithm for calculating the SHA-512 hash is very complex and will not be
presented in this article. You can read about it on Wikipedia —
[set of cryptographic hash functions SHA-2](https://en.wikipedia.org/wiki/SHA-2).

There are services[^2]
to calculate SHA-512 hash [online](https://sha512.online).

[^2]:
    Whatever way to calculate the SHA-512 hash, for the same input value the
    result will always be the same. This is the essence of hashing!

So, for our experiment, we use the master password "123456". Its hash is
`ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413`.
The hash is a number in hexadecimal. This means,
that in addition to digits, this number can contain letters
from the `abcdef` set[^3].

[^3]:
    Sometimes these letters are written in lowercase,
    sometimes uppercase. For Passcryptum password generation algorithm
    the master password hash must be written in lowercase letters.

### Unique login string

We have one master password, and there can be as many services and logins
as you want. Thus, for each login, we have a unique source string,
which formed from the following parts:

- master password hash;
- service name;
- login name;
- version number;
- `1` if we use special characters, `0` if not;
- password length.

These parts are written one after the other and are separated by the `/` (slash)
character.

Let's compose a unique source string for our experiment:
`ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413/github.com/nelkor/1/1/8`[^4].

[^4]:
    At the end of the line we see `1/1/8`. First comes the version number — `1`.
    Then comes `1` because we use special characters
    (and then `8` as the length of the password). If we didn't use special
    characters, the end of the line would be `1/0/8`.

### Seeds

One seed is a number from zero to 65535. And we need so many of them,
how many characters we want in the password. For our experiment,
this number is 8. First, what will we do to get the seeds —
compute the SHA-512 hash from the unique original login string:
`ae87ff96d30d17fe67e88ab599c4beba6446d12188c88beeb4ce9ec41f2a74567e76ac231444cd1908d884e4ea883354165383c4682adcab0b9f406a76974e43`.

Next, we take N times 4 characters from the string of the resulting hash,
where N is desired number of characters in the password:
`ae87, ff96, d30d, 17fe, 67e8, 8ab5, 99c4, beba`.

Each of these "pieces" of four characters is divided in half
and swap these halves:
`87ae, 96ff, 0dd3, fe17, e867, b58a, c499, babe`.

And finally, we get seeds! To do this, each of the inverted "pieces"
convert from hexadecimal to decimal:
`34734, 38655, 3539, 65047, 59495, 46474, 50329, 47806`.

These numbers will be our seeds.

### Charset

Passcryptum guarantees that received passwords will contain at least one digit,
at least one lowercase Latin letter and at least one uppercase Latin letter.
If "use special characters" is enabled in the service,
it is also guaranteed that the result contains at least one special character.

This is achieved using a charset, which consists of four parts:

- `0123456789`;
- `ABCDEFGHIJKLMNOPQRSTUVWXYZ`;
- `abcdefghijklmnopqrstuvwxyz`;
- <code>`!@#$%^&\*()-\_=+{[]};:"|/.,<></code>.

If special characters are not included, then the charset consists of three
parts. The fourth in this case simply disappears. For our experiment,
we use special characters.

### Taking characters

We are ready to turn our seeds into characters. The first four seeds will be
taken one character from each part of the charset. If special characters
are not included, then these will be the first three seeds.

#### The formula for taking a character on the example of the first seed

We need to calculate the
[remainder of the division](https://en.wikipedia.org/wiki/Euclidean_division)
seed by the size of the corresponding part of the charset. For example, the
first seed is `34734` and the first part of the charset is `0123456789`. The
first part of the charset consists of ten characters, that is, its size is
`10`. The remainder of dividing `34734` by `10` is `4`
(34730 is divisible by 10 without a remainder, and 4 remains).

Mathematical notation is `34734 % 10 = 4`.

We use the resulting remainder as an index for taking a character from
the corresponding set. This means that if the remainder is zero, then we take
first character; if the remainder is equal to one — the second and so on.

Our first remainder is four[^5]. This means that we will take the fifth character
from the part of set `0123456789`. That is, we will take the character `4`.

[^5]:
    The minimum remainder from dividing a number by the size of the set is zero,
    and the maximum is one less than the size of the set. This means that each
    a possible remainder from division corresponds to its element of the set.

#### Second, third and fourth seeds

The second and third parts of the charset are the letters of the Latin alphabet.
Uppercase and lowercase. They both have size `26`. Let's perform operations for
the second and third seeds, by analogy with the first:

- `38655 % 26 = 19`;
- `3539 % 26 = 3`.

The twentieth character of the second part is `T`. The fourth character of the
third part is `d`. The part of the special characters have the size `28`.
Let's transform the fourth seed: `65047 % 28 = 3`.
The fourth character of the fourth part is `#`.

In total, the first four seeds were converted to `4Td#` characters.

#### The rest of the seeds

We have received one representative of each part of the charset. That is,
we fulfilled the guarantee of the presence in the password of at least one
digit, capital letter, lowercase letter and special character.

We will transform the remaining seeds in exactly the same way, but not for
individual parts of the charset, but for the entire charset. For example,
the tenth character of the entire charset will be `9`, and the eleventh
character will be `A`. Entire charset size with special characters — `90`.
Without special characters — `62`.

Let's perform operations for the remaining seeds of our experiment:

- `59495 % 90 = 5`, — `5`;
- `46474 % 90 = 34`, — `Y`;
- `50329 % 90 = 19`, — `J`;
- `47806 % 90 = 16`, — `G`.

In total, the seeds were converted to the string `4Td#5YJG`.

#### Shuffling

The string `4Td#5YJG` already looks like a good password. But it is not.
And it's not even that we chose the minimum length. The point is that the first
four characters is pretty predictable. With this approach, we know exactly that
the first character is a digit, the second is an uppercase letter, the third is
a lowercase letter, and the fourth is a special character. We would not like to
provide such information to someone who tries to guess our password.

So, we need to shuffle these characters! The shuffling method is as follows:
sort seeds in ascending order, and put each character in the position in which
is the seed that gave birth to it.
Let's perform this operation for our experiment:

- `3539`, — `d`;
- `34734`, — `4`;
- `38655`, — `T`;
- `46474`, — `Y`;
- `47806`, — `G`;
- `50329`, — `J`;
- `59495`, — `5`;
- `65047`, — `#`;

After shuffling, we have the string `d4TYGJ5#`. This is the password!

## Conclusion

Passcryptum doesn't do anything supernatural, password generation is based on
quite simple arithmetic. Any user can enter the master password "123456" and
make sure the application will generate exactly the same password as the result
manual calculations.

Even if for some reason the application suddenly disappears, all passwords can
be restored manually. But manually generating passwords is too long,
and the Passcryptum application interface will perform all the necessary
operations in a split second.
