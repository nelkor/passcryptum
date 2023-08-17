import { getSession } from '../../session'

export const deleteData = () => {
  const { lsKey } = getSession()

  localStorage.removeItem(lsKey)
}
