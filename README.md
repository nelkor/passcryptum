# Passcryptum

A free open source cryptographic password manager.

Remember only one password
and have unique strong passwords for each of your accounts.

Unlike other password managers, Passcryptum does not store passwords
in the cloud or on your devices.
You cannot lose your passwords even if you lose everything.
As a web application, Passcryptum may be limited in access to the network.
In case of Passcryptum, you can be 100% sure that it won't leak your personal
data to the Internet.

## Online version

[passcryptum.com](https://passcryptum.com)

## Standalone offline version

Download the application directory from
[the releases](https://github.com/nelkor/passcryptum/releases).
Open the `index.html` file in a browser by double-clicking it.

## Getting started

Come up with a single strong password that you will have to remember.

Enter it on the master password entry page.

Add a service to your configuration by simply entering its name.

Add a login to your service by simply entering its name.

Save the entered data by clicking the "Save configuration" button.

Get the login password by clicking the "Copy password" button.

Change the password for this login in the service
to the generated one from Passcryptum.

Well done! You have transferred one of your accounts to Passcryptum.
Every time you need to log in to your account, enter Passcryptum with
your master password and copy the login password.

## Further use

At the top of the working screen, we see a sequence of six characters.
These characters are derived from your master password. Get used to your
characters. If suddenly you see unfamiliar characters,
then you have mistyped your master password.

Some services restrict our ability to use special characters in passwords. For
such services, you can uncheck "Use special characters". Also, just in case, the
application has the ability to choose the length of passwords for the service.

Sometimes we need to update our account passwords. In order for the
"Copy password" button to start issuing a new password for the old login,
you need to increment its version. Don't forget to click "Save configuration"!

The configuration is a list of your services, including password preferences,
and a list of logins in services, including the logins' versions.
The configuration is stored on the browser disk in encrypted form. Without
knowing your master password, it is impossible to decrypt your configuration.
You can transfer the configuration from one device to another. This is done in
the configuration panel by copying a string or downloading a file.

If you have many services, it will be easier to find the right one by entering
part of its name. To focus on the desired input from the keyboard,
press `Alt + S`.

## Recommendations

[Explore](https://developer.chrome.com/docs/devtools/network)
the browser's options for restricting applications from accessing the network.
You won't have to trust an app
if you know that it does not physically have internet access.

Think of a really strong master password. Over time, you will get used to it
and learn how to enter it easily and quickly.

It is very important not to make mistakes in service names. They are responsible
for password generation. Personally, I use second-level domains as service
names. For example, "github.com".

Learn the
[password generation algorithm](https://github.com/nelkor/passcryptum/blob/dev/docs/en/password-generation-algorithm.md).
You will understand where passwords come from when they are not stored anywhere.
You will realize that as long as you know your master password, you will be able
to recover the password for any of your accounts.

## Contact us

We use Telegram!

- News [@passcryptum](https://t.me/passcryptum)
- Chat [@passcryptum_chat](https://t.me/passcryptum_chat)
- Chat in Russian [@passcryptum_ru](https://t.me/passcryptum_ru)
