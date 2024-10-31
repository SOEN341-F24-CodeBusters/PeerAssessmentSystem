import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'
import basicSsl from '@vitejs/plugin-basic-ssl'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), basicSsl()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['test/setupTests.ts'],
  },
})
