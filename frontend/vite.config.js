import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';
import path from 'path';

// Custom lightweight plugin for HTML includes
function htmlPartials() {
  return {
    name: 'html-partials',
    transformIndexHtml(html) {
      return html.replace(/<load\s+src="([^"]+)"\s*\/?>/g, (match, src) => {
        const filePath = path.resolve(import.meta.dirname, src);
        if (fs.existsSync(filePath)) {
          return fs.readFileSync(filePath, 'utf-8');
        }
        console.warn('Could not find HTML partial:', filePath);
        return match;
      });
    }
  };
}

export default defineConfig({
  plugins: [
    tailwindcss(),
    htmlPartials()
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