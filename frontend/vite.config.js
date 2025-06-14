import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  publicDir: 'public',
  plugins: [react()],
  preview: {
    allowedHosts: true,
    port: 80,
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Your backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Your backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});