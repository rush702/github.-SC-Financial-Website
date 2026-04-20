import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // In production (GitHub Pages) assets must be relative so the app works
  // under https://rush702.github.io/SC-Financial-Life-Group/
  base: command === 'build' ? '/SC-Financial-Life-Group/' : '/',
}))
