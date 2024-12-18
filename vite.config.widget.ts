import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { terser } from 'rollup-plugin-terser'

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/lib/widget-loader.ts'),
      name: 'WidgetLoader',
      fileName: 'widget-loader',
      formats: ['umd']
    },
    rollupOptions: {
      plugins: [terser()],
      external: [], // We want to include all dependencies
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    },
    outDir: 'dist/cdn',
    emptyOutDir: true,
    sourcemap: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  }
})