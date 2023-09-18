
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    // open: '/index.html',
    proxy: {
      '/web': {
        target: 'http://localhost:3000',
      },
    },
  },
});
