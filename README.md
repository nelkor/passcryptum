# Passcryptum

A free open source cryptographic password manager.

Remember only one password
and have unique strong passwords for each of your accounts.

Unlike other password managers, Passcryptum does not store passwords
in the cloud or on your devices.
You cannot lose your passwords even if you lose everything.

[passcryptum.com](https://passcryptum.com)

## Standalone offline version

Download `passcryptum.html` from
[the releases](https://github.com/nelkor/passcryptum/releases).
Open the file in a browser by double-clicking it.

## Getting started

- Придумайте единственный надёжный пароль, который вам придётся помнить;
- Войдите в Passcryptum с помощью этого пароля;
- Добавьте свой аккаунт по имени сервиса и логину;
- Скопируйте пароль при помощи кнопки;
- Смените пароль в вашем аккаунте на сгенерированный Passcryptum.

Well done! You have transferred one of your accounts to Passcryptum.
Every time you need to log in to this account, enter Passcryptum
with your origin password and copy the login password.

## Further use

Установите PIN! Прочитайте
[инструкцию](https://github.com/nelkor/passcryptum/blob/main/docs/pin.md),
почему это важно и как этим пользоваться.

Some services restrict our ability to use special characters in passwords.
For such services, you can uncheck "Use special characters".

Sometimes we need to update our account passwords. In order for the copy password button
to start issuing a new password for the old login, you need to increment its version.

The configuration is a list of your services, including password preferences,
and a list of logins in services, including the logins' versions.
The configuration is stored on the browser disk in encrypted form.
Without knowing your origin password, it is impossible to decrypt your
configuration. You can transfer the configuration from one device to another.
This is done in the configuration panel by copying a string or downloading a file.

If you have many services, it will be easier to find the right one by entering
part of its name. To focus on the desired input from the keyboard, press `Alt + S`.

## Explore the materials

Изучите
[наши рекомендации](https://github.com/nelkor/passcryptum/blob/main/docs/recommendations.md)
по использованию Passcryptum. Вы узнаете, как обеспечить себе максимально лёгкий путь
к восстановлению всех паролей, даже на случай утраты всех ваших устройств одновременно.

Learn the
[password generation algorithm](https://github.com/nelkor/passcryptum/blob/main/docs/password-generation.md).
You will understand where passwords come from when they are not stored anywhere.
You will realize that as long as you know your origin password, you will be able
to recover the password for any of your accounts.

## Contact us

We use Telegram!

- News [@passcryptum](https://t.me/passcryptum)
- Chat [@passcryptum_chat](https://t.me/passcryptum_chat)
- Chat in Russian [@passcryptum_ru](https://t.me/passcryptum_ru)
