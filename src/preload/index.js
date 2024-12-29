/* eslint-disable no-undef */
import { electronAPI } from '@electron-toolkit/preload'
import { contextBridge, ipcRenderer } from 'electron'

// Custom APIs for renderer
const api = {
  ipcRenderer: ipcRenderer
}

contextBridge.exposeInMainWorld('electronAPI', {
  onTextCopy: (callback) => ipcRenderer.on('copy-text', callback),
  onCopyByPath: (callback) => ipcRenderer.on('copy-by-path', callback),

  sendCopy: (channel, data) => {

    const validChannels = ["data-copy"];

    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
})



// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)

    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
