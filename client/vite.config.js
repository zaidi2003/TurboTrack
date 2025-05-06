
// https://vitejs.dev/config/
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './' // ← This is important for relative asset paths
})
