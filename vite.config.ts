import { imageOptimizationConfig } from './src/shared/constants/vite-defualt-configs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  plugins: [react(), ViteImageOptimizer(imageOptimizationConfig)],
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
});
