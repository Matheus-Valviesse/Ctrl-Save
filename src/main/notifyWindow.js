import { BrowserWindow, screen } from 'electron'
import path, { join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let notificationWindow = null;

export function showNotification() {
  const display = screen.getPrimaryDisplay();
  const { width } = display.workAreaSize;

  // Se a janela já existe e não foi fechada
  if (notificationWindow && !notificationWindow.isDestroyed()) {
    notificationWindow.showInactive(); // mostra sem focar
    return notificationWindow;
  }

  // Cria a janela
  notificationWindow = new BrowserWindow({
    width: 380,
    height: 110,
    x: width - 380,
    y: 100,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: false,
    skipTaskbar: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  // Carrega HTML
  const loadPath = process.env.NODE_ENV === 'development'
    ? 'http://localhost:5173/notifi.html'
    : join(__dirname, '../renderer/notifi.html');

  const loader = process.env.NODE_ENV === 'development'
    ? notificationWindow.loadURL(loadPath)
    : notificationWindow.loadFile(loadPath);

  loader.then(() => notificationWindow.showInactive())
    .catch(err => {
      console.error('Erro ao carregar notificação:', err);
      notificationWindow.close();
      notificationWindow = null;
    });

  // Limpa referência quando fechar
  notificationWindow.on('closed', () => {
    notificationWindow = null;
  });

  return notificationWindow;
}
