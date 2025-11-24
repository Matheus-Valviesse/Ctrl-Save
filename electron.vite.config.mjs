import { join, resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import removeConsole from 'vite-plugin-remove-console'

export default defineConfig({
  css: {
    postcss: './postcss.config.cjs', // Certifique-se de ter o arquivo PostCSS configurado.
  },
  main: {
    plugins: [externalizeDepsPlugin()],
    assets: [
      {
        from: join(__dirname, "src/main/resources"),
        to: "resources"
      }
    ]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    build: {
      rollupOptions: {
        input: {
          browser: resolve(__dirname, 'src/renderer/index.html'),
          webview: resolve(__dirname, 'src/renderer/notifi.html')
        }
      }
    },
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [react(), removeConsole()]
  },
  resolve: {
    alias: {
      "@mocks": "/src/mocks",
    },
  },

})
