import { ipcMain } from "electron";
import { showNotification } from "./notifyWindow";

export function registerNotificationIPC() {
  ipcMain.on("show-message", () => {
    console.log('aqui')
    showNotification();
  });
} 