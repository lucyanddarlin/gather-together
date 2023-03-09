import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import Unocss from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [uni(), Unocss()],
    // css: {
    //   preprocessorOptions: {
    //     scss: {
    //       additionalData: `@use "@/styles/mixin.scss" as *;`,
    //     },
    //   },
    // },
    build: {
      terserOptions: {
        compress: {
          drop_console: command !== 'serve',
        },
      },
    },
  }
})
