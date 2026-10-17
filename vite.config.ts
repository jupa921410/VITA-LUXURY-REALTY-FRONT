import { readFile } from 'node:fs';
import { pages } from './src/lib/seo.ts';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), {
    name: 'seo-preview-routes',
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = new URL(req.url || '/', 'http://localhost');
        const path = url.pathname.replace(/\/+$/, '') || '/';
        if (pages[path]) {
          req.url = (path === '/' ? '/index.html' : path + '/index.html') + url.search;
        } else if (/^\/properties\/[^/]+$/.test(path)) {
          req.url = '/app.html' + url.search;
        } else if (!path.split('/').pop()?.includes('.')) {
          readFile(resolve(server.config.root, server.config.build.outDir, '404.html'), 'utf8', (error, html) => {
            if (error) return next(error);
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.end(html);
          });
          return;
        }
        next();
      });
    },
  }],
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, 'src'),
    },
  },
});
