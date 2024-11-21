import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'


// https://vitejs.dev/config/

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  base: isProduction ? '/PeerAssessmentSystem/' : '/',
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['test/setupTests.ts'],
  }
})

