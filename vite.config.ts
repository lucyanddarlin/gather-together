import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import Unocss from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  console.log('vite', command)
  return {
    plugins: [uni(), Unocss()],
    build: {
      terserOptions: {
        compress: {
          drop_console: command !== 'serve',
        },
      },
    },
  }
})
