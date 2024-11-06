import path from 'path';
import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    alias: {
      '@src': path.resolve(__dirname, 'src'),
    },
    env: loadEnv('', process.cwd(), ''),
  }
});