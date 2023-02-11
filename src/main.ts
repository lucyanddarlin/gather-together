import { createSSRApp } from 'vue'
import { setupStore } from '@/store'

import NavBar from '@/components/nav-bar.vue'
import TabSection from './components/tab-section.vue'
import TabItem from './components/tab-item.vue'
import App from './App.vue'
import 'uno.css'
import '@/styles/index.scss'
import uView from './uni_modules/vk-uview-ui'

export function createApp() {
  const app = createSSRApp(App)
  setupStore(app)
  app.use(uView)
  app.component('NavBar', NavBar)
  app.component('TabSection', TabSection)
  app.component('TabItem', TabItem)
  return {
    app,
  }
}
