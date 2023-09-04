<script setup lang="ts">
import { ConfigIo } from '@/widgets/io'
import { ServicesList } from '@/widgets/services-list'
import { sessionId, ExitButton } from '@/entities/session'
import { SetPinButton, DeletePinButton } from '@/features/pin'
import { AddServiceForm, DeleteConfigButton } from '@/features/services'
</script>

<template>
  <details>
    <summary>Settings</summary>

    <fieldset>
      <legend>PIN</legend>

      <p class="proto-description">
        After setting the PIN, it will be possible to enter here using it. PIN
        login information is stored on your device. You can set and delete
        different PIN codes as many times as you like, the main thing is to
        remember your origin password.
      </p>

      <DeletePinButton />
      <SetPinButton />
    </fieldset>

    <fieldset>
      <legend>Account</legend>

      <p class="proto-description">
        The four letters you see below are your account ID. If you make a
        mistake when entering your password, you will see other letters here.
      </p>

      <p>{{ sessionId }}</p>
      <ExitButton />
    </fieldset>

    <fieldset>
      <legend>Config</legend>

      <p class="proto-description">
        Config is information about your services and logins. This data is
        stored on your device in encrypted form. You can share the config of one
        device with another as a text or file.
      </p>

      <ConfigIo />
      <DeleteConfigButton />
    </fieldset>

    <fieldset>
      <legend>Add a service</legend>

      <p class="proto-description">
        Add a service and a login to your config and get the password.
      </p>

      <AddServiceForm />
    </fieldset>
  </details>

  <ServicesList />
</template>
