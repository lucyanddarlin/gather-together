import { createSSRApp } from 'vue'
import uView from 'vk-uview-ui'
import { setupStore } from '@/store'

import NavBar from '@/components/nav-bar.vue'
import MannerButton from '@/components/manner-button.vue'
import Empty from '@/components/empty.vue'
import Popup from './components/popup.vue'
import TabSection from './components/tab-section.vue'
import TabItem from './components/tab-item.vue'
import PaperItem from './components/paper-item.vue'
import LoadMore from './components/load-more.vue'
import Float from './components/float.vue'
import FormItem from './components/form-item.vue'
import App from './App.vue'
import 'uno.css'
import '@/styles/index.scss'

export function createApp() {
  const app = createSSRApp(App)
  setupStore(app)
  app.use(uView)
  app.component('NavBar', NavBar)
  app.component('TabSection', TabSection)
  app.component('TabItem', TabItem)
  app.component('PaperItem', PaperItem)
  app.component('MannerButton', MannerButton)
  app.component('LoadMore', LoadMore)
  app.component('Float', Float)
  app.component('Popup', Popup)
  app.component('FormItem', FormItem)
  app.component('Empty', Empty)
  return {
    app,
  }
}
