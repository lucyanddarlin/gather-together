import { createSSRApp } from 'vue'
import { setupStore } from '@/store'
import App from './App.vue'
import 'uno.css'

// 引入iconfont
import '@/static/icons/iconfont.css'

import uView from './uni_modules/vk-uview-ui'

export function createApp() {
  const app = createSSRApp(App)
  setupStore(app)
  app.use(uView)
  return {
    app,
  }
}
