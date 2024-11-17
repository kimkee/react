import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  define: {
    MY_GLOBAL_VARIABLE: '111111111111111111111'
  },
  plugins: [react()],
  publicDir: 'public',
  root: process.cwd(),
  base: '/',
  resolve: {
    alias:{
      '@': path.resolve(__dirname,'./src')
    }
  },
  server: {
    watch: {
      ignored: ['!**/node_modules/your-package-name/**','*.css']
    }
  },
  build: {
      outDir: './dist',
      minify: 'esbuild',
      chunkSizeWarningLimit :1500 ,
      // assetsInlineLimit: 0,
      // filenameHashing: false,
  },
})
