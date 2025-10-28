/* eslint-disable no-undef */
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  onTextCopy: (callback) => ipcRenderer.on('copy-text', callback),
  onCopyByPath: (callback) => ipcRenderer.on('copy-by-path', callback),

  getCopies: () => ipcRenderer.invoke("get-copies"),
  addCopy: (item) => ipcRenderer.invoke("add-copy", item),
  editCopy: (id, updated) => ipcRenderer.invoke("edit-copy", { id, updated }),
  deleteCopy: (id) => ipcRenderer.invoke("delete-copy", id),

  sendCopy: (channel, data) => {

    const validChannels = ["data-copy"];

    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },

  showMessage: () => ipcRenderer.send("show-message"),
  closeNotifi: () => ipcRenderer.send("close-notifi"),
  onUpdateData: (callback) => ipcRenderer.on('update-data', (_, data) => callback(data))

})
