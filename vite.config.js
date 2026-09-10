import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  preview: {
    port: 5176,
  },
  build: {
    rollupOptions: {
      // ensure SPA fallback in all server modes
    },
  },
})
