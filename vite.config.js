import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/depth/' // NEU: Setze den Basis-Pfad auf deinen Repository-Namen
})
