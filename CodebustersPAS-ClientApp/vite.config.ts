import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['test/setupTests.ts'],
  },
  server: {
    watch: {
      usePolling: true,
    }
  },
  preview: {
    host: 'localhost',
    port: 8080
  }
})

