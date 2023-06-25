import { openWindow, closeWindow } from '@/shared/app-window'

export const openAside = (title, component, attrs) => {
  openWindow(title, component, attrs)
}

export const closeAside = () => {
  closeWindow()
}

export const openModalWindow = (title, component, attrs) => {
  openWindow(title, component, attrs)
}

export const closeModalWindow = () => {
  closeWindow()
}
