import { BrowserWindow, screen } from 'electron'
import path, { join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let notificationWindow = null

export function showNotification() {
  const display = screen.getPrimaryDisplay()
  const { width } = display.workAreaSize

  // Fecha janela antiga se existir
  if (notificationWindow) {
    notificationWindow.close()
    notificationWindow = null
  }

  notificationWindow = new BrowserWindow({
    width: 380,
    height: 210,
    x: width - 380, // Canto superior direito
    y: 20,
    frame: false,
    roundedCorners: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: false,
    skipTaskbar: true, // Não aparece na taskbar
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'), // Correto: de src/main/ para src/preload/
      nodeIntegration: false, // Explícito para segurança
      contextIsolation: true // Isolado
    }
  })

  // Caminho adaptado para dev/prod - CORRIGIDO
  let loadPath
  if (process.env.NODE_ENV === 'development') {
    loadPath = 'http://localhost:5173/notifi.html' // Vite dev server (raiz renderer)
    notificationWindow.loadURL(loadPath).then(() => {
      notificationWindow.showInactive()
      // Opcional: DevTools só em dev
      if (process.env.NODE_ENV === 'development') {
        notificationWindow.webContents.openDevTools({ mode: 'detach' })
      }
    }).catch(err => {
      console.error('Erro ao carregar notificação em dev:', err)
      notificationWindow.close() // Fecha se falhar
    })
  } else {
    loadPath = join(__dirname, '../renderer/notifi.html') // CORRIGIDO: de src/main/ para src/renderer/
    notificationWindow.loadFile(loadPath).then(() => {
      notificationWindow.showInactive()
    }).catch(err => {
      console.error('Erro ao carregar notificação em prod:', err)
      notificationWindow.close()
    })
  }



  // Evento para limpar referência quando fechada manualmente
  notificationWindow.on('closed', () => {
    notificationWindow = null
  })
}
