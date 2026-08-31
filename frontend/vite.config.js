import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        product: 'product.html',
        category: 'category.html'
      }
    },
    outDir: '../public_html',
    emptyOutDir: true,
  },
  server: {
    port: 3000
  }
});
