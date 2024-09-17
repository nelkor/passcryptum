import { enterWithOriginPassword, enterWithPin } from '#/core'

import { initSession } from '../model/private'
import { isCalculationInProgress } from '../model/public'

export const enterByPassword = async (password: string) => {
  isCalculationInProgress.value = true

  const { id, data } = await enterWithOriginPassword(password)

  initSession(id, data)

  isCalculationInProgress.value = false
}

export const enterByPin = async (pin: string) => {
  isCalculationInProgress.value = true

  try {
    const { id, data } = await enterWithPin(pin)

    initSession(id, data)
  } catch (e) {
    void e

    isCalculationInProgress.value = false

    throw new Error('Wrong PIN')
  }

  isCalculationInProgress.value = false
}
