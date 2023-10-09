# PIN

It may be insecure to use your origin password constantly, to log in
the system. Someone may see it, or, what's even worse, it may be recorded
on the surveillance camera. Using Passcryptum, it is crucially important
not to give anyone a single opportunity to learn your origin password.

That is why PIN exists. You will still need to know and remember your
origin password, but it will be possible not to show it while logging in.

## Getting started

- Log in the system with the help of your origin password;
- Press the PIN setting button;
- Enter any PIN you want.

Done! Now you can log in the system with the help of your PIN.

## What if I forget my PIN?

There is absolutely no problem in it. Just log in the system again using your
origin password and set a new PIN.

## How it works

The hash of your origin password is encrypted by a synchronous algorithm
with two components: the device operating system fingerprint and your PIN.
Encrypted hash is being stored on your device. It means that in order
to generate password to your account, a person needs to know:

- The text saved on your device;
- Your device operating system fingerprint;
- Your PIN.

In general, only you and nobody but you can possess these resources.

## What if someone sees my PIN?

There is no problem in that as well. The PIN, by itself, doesn't contain
any information without full access to your device. If the PIN was compromised,
just change it. In order to change the PIN, just log in the system
by any means and set the new one. Besides, you can simply delete the PIN,
and you don't even need to log in the system to do it.

## System fingerprint

If you update your operating system or web browser, the fingerprint may change.
It means that you won't be able to log in Passcryptum using your set PIN.
In this case you must act the same way as if you forgot it.
You log in using your origin password and set a new PIN.

It may seem inconvenient, but it's a safety measure. If a virus steals
an encrypted text, it won't be enough for its owner to brute-force
possible PINs. They will have to know the operating system fingerprint as well.
