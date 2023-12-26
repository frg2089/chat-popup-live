import { qwikVite } from '@builder.io/qwik/optimizer'
import { resolve } from 'node:path'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'chatbox.html'),
        sender: resolve(__dirname, 'sender.html'),
      },
    },
  },
  plugins: [
    UnoCSS(),
    qwikVite({
      csr: true,
    }),
  ],
})
