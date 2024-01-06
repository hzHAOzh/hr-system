import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

//配置别名用
const resolve = (dir: string) => path.join(__dirname, dir)


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  //配置别名用
  resolve: {
    alias: {
      '@': resolve('src'),
      'comps': resolve('src/components'),
      'apis': resolve('src/apis'),
      'views': resolve('src/views'),
      'utils': resolve('src/utils'),
      'routes': resolve('src/routes'),
      'styles': resolve('src/styles')
    }
  },
  server: {
    port: 80,
    host: true,
    open: true,
    hmr: true,
    proxy: {
      // https://cn.vitejs.dev/config/#server-proxy
      '/dev-api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/dev-api/, '')
      }
    }
  },
})
