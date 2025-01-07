import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Port for local development
    proxy: {
      '/api': {
        target: 'https://sealink-logistics-9b22514c9549.herokuapp.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
