import { createSSRApp } from 'vue'
import { setupStore } from '@/store'

import NavBar from '@/components/nav-bar.vue'
import TopSelectpage from '@/components/top-selectPage.vue'
import App from './App.vue'
import 'uno.css'
import '@/styles/index.scss'
import uView from './uni_modules/vk-uview-ui'

export function createApp() {
  const app = createSSRApp(App)
  setupStore(app)
  app.use(uView)
  app.component('NavBar', NavBar)
  app.component('TopSelectpage', TopSelectpage)
  return {
    app,
  }
}
