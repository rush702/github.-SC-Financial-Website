import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command, mode }) => ({
  plugins: [react()],
  // In production (GitHub Pages) assets must be relative so the app works
  // under https://rush702.github.io/SC-Financial-Life-Group/
  // The "standalone" mode builds a copy that always jumps straight to the
  // application (see App.jsx) and is published to a sub-path of the same
  // free GitHub Pages site: https://rush702.github.io/SC-Financial-Life-Group/apply/
  base: mode === 'standalone' ? '/SC-Financial-Life-Group/apply/' : (command === 'build' ? '/SC-Financial-Life-Group/' : '/'),
}))
