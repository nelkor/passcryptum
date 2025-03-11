import { showSetOnlinePinModal, showSetOfflinePinModal } from '../model'

export const setOnlinePin = () => {
  showSetOnlinePinModal.value = true
}

export const setOfflinePin = () => {
  showSetOfflinePinModal.value = true
}
