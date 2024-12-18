import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/lib/widget-loader.ts',
      name: 'WidgetLoader',
      fileName: 'widget',
      formats: ['iife']
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        pure_funcs: ['console.log']
      }
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        },
        dir: 'public/widgets'
      }
    }
  }
})