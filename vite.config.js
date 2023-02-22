/// <reference types="vitest" />
/// <reference types="vite/client" />

import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import image from '@rollup/plugin-image';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'lib/assets'),
    },
  },
  plugins: [
    { ...image(), enforce: 'pre', apply: 'build' },
    { ...react(), apply: 'serve' },
  ],
  build: {
    target: 'es2015',
    minify: 'esbuild',
    copyPublicDir: false,
    lib: {
      entry: path.resolve(__dirname, 'lib/index.js'),
      formats: ['es', 'cjs', 'umd'],
      name: 'MegaMenu',
      fileName: 'megamenu',
    },
    rollupOptions: {
      external: ['react'],
      output: {
        globals: {
          react: 'React',
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: path.resolve(__dirname, 'scripts/tests/setup.js'),
    // you might want to disable it, if you don't have tests that rely on CSS
    // since parsing CSS is slow
    css: true,
  },
});
