import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom', // Ensure JSDOM is used for React components
    setupFiles: './setupTests.ts', // Optional: Custom setup file
  },
});
