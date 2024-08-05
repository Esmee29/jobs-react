import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/jobs-react/',
  plugins: [react()],
  server: {
    port: 3000,
    // Remove the proxy configuration
  },
});
