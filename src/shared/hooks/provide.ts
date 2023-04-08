import { provide, inject } from 'vue'

type ProvideFn<T> = (value: T) => T
type InjectFn<T> = () => T
type Provider<T> = [ProvideFn<T>, InjectFn<T>]

let i = 0

const createKey = () => `_${++i}`

export const useProvider = <T>(): Provider<T> => {
  const key = createKey()

  return [
    (value: T) => {
      provide(key, value)

      return value
    },
    () => {
      const value = inject<T>(key)

      if (!value) {
        throw new Error('Attempt to inject an undefined value')
      }

      return value
    },
  ]
}
