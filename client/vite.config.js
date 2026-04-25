import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: false,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
  build: {
    target: 'es2022',
    sourcemap: true,
    // three.js pesa ~730 KB min. Está correctamente code-split y nunca
    // entra al bundle principal — subimos el umbral para que el build
    // no grite por un chunk que ya es lazy.
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        // three y R3F se consumen solo desde SphereScene (dynamic import),
        // así que estos chunks quedan fuera del bundle principal y se
        // pueden cachear por separado entre upgrades de una u otra capa.
        manualChunks(id) {
          if (id.includes('node_modules/three/')) return 'three';
          if (id.includes('node_modules/@react-three/')) return 'r3f';
        },
      },
    },
  },
});
