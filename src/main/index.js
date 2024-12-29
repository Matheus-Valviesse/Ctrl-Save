/* eslint-disable no-undef */

import { app, shell, BrowserWindow, ipcMain, clipboard, globalShortcut } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { GlobalKeyboardListener } from 'node-global-key-listener'

// Instância do listener global de teclado
const keyboardListener = new GlobalKeyboardListener();

// Função para criar a janela principal do aplicativo
function createWindow() {
  // Configurações da janela do navegador
  const mainWindow = new BrowserWindow({
    width: 350,
    height: 600,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'), // Carrega o script preload
      sandbox: false
    }
  });

  // Mostra a janela quando estiver pronta
  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  // Variável para armazenar o último conteúdo da área de transferência
  let lastClipboardContent = '';
  clipboard.clear(); // Limpa a área de transferência inicialmente

  // Adiciona um listener para capturar teclas globais
  keyboardListener.addListener((e, down) => {
    // Verifica se a tecla 'C' está pressionada com Ctrl esquerdo
    if (e.state === 'DOWN' && e.name === 'C') {
      if (down['LEFT CTRL']) {

        setTimeout(() => {

          const currentClipboardContent = clipboard.readText(); // Lê o conteúdo da área de transferência

          // Se o conteúdo mudou, exibe no console e envia para o renderizador
          if (currentClipboardContent !== lastClipboardContent) {
            lastClipboardContent = currentClipboardContent;

            // Envia o conteúdo copiado para o processo de renderização
            mainWindow.webContents.send('copy-text', currentClipboardContent);
          }
        }, 100); // Excuta após 100ms
      }
    }
  });

  // Registra atalhos globais para Alt+0 a Alt+9
  for (let i = 0; i <= 9; i++) {
    const key = `alt+${i}`;
    const success = globalShortcut.register(key, () => {
      console.log(`Você pressionou: ${key}`);
      // Envia o atalho pressionado para o renderer
      mainWindow.webContents.send('copy-by-path', key);
    });

    // Verifica se o atalho foi registrado com sucesso
    if (!success) {
      console.error(`Falha ao registrar o atalho ${key}`);
    }
  }

  // Configura para abrir links externos no navegador padrão
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  // Carrega a URL remota em desenvolvimento ou o arquivo local em produção
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
}

// Inicialização do aplicativo quando estiver pronto
app.whenReady().then(() => {
  // Define o ID do modelo de usuário para Windows
  electronApp.setAppUserModelId('com.electron');

  // Configura atalhos padrão para desenvolvimento
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  // Exemplo de comunicação IPC (teste)
  ipcMain.on('ping', () => console.log('pong'));

  // Cria a janela principal
  createWindow();

  // No macOS, recria a janela quando o ícone do dock é clicado
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Fecha o aplicativo quando todas as janelas forem fechadas (exceto no macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Manipulador para requisições IPC do renderer
ipcMain.handle('get-data', async (event, args) => {
  console.log('Parâmetros recebidos:', args);
  return { dados: 'Aqui está a resposta do backend!' }; // Retorna dados simulados
});

// Manipulador para copiar texto enviado do renderer para a área de transferência
ipcMain.on('data-copy', async (event, args) => {
  if (args.text) clipboard.writeText(args.text); // Copia o texto para a área de transferência
});
