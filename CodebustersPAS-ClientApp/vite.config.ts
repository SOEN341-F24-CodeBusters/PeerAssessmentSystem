import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'


// https://vitejs.dev/config/

const isDeployment = process.env.NODE_ENV === 'deploy';

export default defineConfig({
  base: isDeployment ? '/PeerAssessmentSystem/' : '/',
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['test/setupTests.ts'],
  }
})

