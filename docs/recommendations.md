# Recommendations

Passcryptum doesn't restrict users' choices of origin passwords, ways of naming
services etc. This freedom must be used in a right way. When a moment comes,
to restore access to all of your accounts from scratch, you'd better not guess
the name of this or that service and its password settings.

Service configuration is encrypted. Without your origin password, it's just
a random set of bytes. Don't limit yourself in saving backups of your
services anywhere, even in public places. It may save you from possible
restoring of all your services manually.

## Origin password

You'd better not economize on the difficulty of your origin password. It's very
important that nobody should be able to guess what origin password you use,
otherwise they will be able to gain access to all your accounts.

We recommend to use a string of random symbols. E.g. you may generate
a password in any online password generator and then randomly
change and shuffle symbols in it.

We highly recommend not to use an origin password less than 8 symbols long.
Password length of 8 symbols is quite strong for almost everyone and everything.

> Using Latin letters, figures and special symbols
> (there are not less than 90 of them in all),
> the number of possible variants for 8-symbol password is
> 90 ^ 8 = 4304672100000000, which exceeds the population of our planet
> half a million times.

However, if you want to be sure that even hackers with powerful devices
won't gain access to your accounts,
try and remember a random string of 12 symbols.

> 90 ^ 12 = 282429536481000000000000, which exceeds the number
> of sand grains on Earth myriads of times.

Passwords of more than 12 symbols are dangerous, because you may forget them.
It is strictly forbidden to forget your origin password, as it is impossible
to restore. It is your full responsibility to remember your origin password.

## PIN

Use a strong PIN. Four-digit version, as of a credit card, is too weak.
You cannot exclude the possibility of someone gaining access to your device
and trying to brute-force your PIN.

The difficulty of your PIN must be comparable to the one
of your origin password. The good news is that you can forget your PIN
and set a new one as often as possible.

Change your PIN from time to time. You can never say where a surveillance camera
could record you entering it.

If you need to log in the system in a public place, and you have forgotten
your PIN, take every precaution while entering your origin password.

Remember that if you enter only your PIN, there is a risk of forgetting your
origin password, and it may be a disaster. Being in a safe place,
enter your origin password from time to time in order to refresh your memory.

## Service names

We recommend to name services by the name of their second-level domain.
E.g. GitHub in the Passcryptum system will have the name of `github.com`.
This simple rule will allow you to remember the necessary service names
in case you have to restore the service configuration from scratch.

It's hard to imagine a service without a site. Probably, this rule will work
for all the services. Sometimes it happens so that the service changes
the site name (e.g. Twitter). The bad news is that you will have to change your
password. The good news is that it is a very rare case.

## Service preferences

We recommend to have default settings whenever it is possible. I.e. special
symbols will be enabled, and the password length will be 20 symbols.

It is possible in the majority of cases, but not in all of them.
Some of the services think that they must tell us which symbols we can use and
which we can't. If the service doesn't accept special symbols in the password,
just disable the usage of them without changing the length.

The password length setting is only for specific cases. You can use it of your
own free choice. But beware, if the services file is lost, you will have
to remember what password length was set in each case.

## Logins

Use the obvious logins mainly. E.g. the same login in the majority of services.
You should have spare logins in case the main one is already used by someone else.

## Versions

Increase the version by 1 every time you want to change your password.
Version is the only thing you will have to sort through while restoring
the configuration. As a rule, passwords don't change very often,
so you won't have to sort through too many versions.
