import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { Server } from 'node:http'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
,
server:{
  proxy:{
    '/api':{//获取包含/api的请求
      target:'http://localhost:8080/start',//后台服务器的源
      changeOrigin:true,//是否改源
      rewrite:(path)=>path.replace(/^\/api/,'') //替换/api为''
    }
  }
}
})

