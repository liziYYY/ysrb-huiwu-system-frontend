import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import uni from '@dcloudio/vite-plugin-uni';

export default defineConfig({
  plugins: [
    vue(),
    uni()
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path
      }
    }
  }
});
