import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/citytech-ticketing-system/' : '/',
  plugins: [react()],
  css: {
    postcss: true
  }
}))
