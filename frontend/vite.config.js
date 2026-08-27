import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    outDir: '../public_html',
    emptyOutDir: true,
  },
  server: {
    port: 3000
  }
});
