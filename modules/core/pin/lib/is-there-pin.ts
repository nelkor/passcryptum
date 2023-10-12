import { getEncryptedHash } from '../../actions'

export const isTherePin = () => Boolean(getEncryptedHash())
