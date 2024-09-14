import { createApp } from 'vue'
import App from './App.vue'
import { setupModules } from './modules'

import { setupRouter } from './router'

import { setupStore } from './store'
import '@unocss/reset/tailwind.css'
import './style/index.less'
import 'uno.css'

const app = createApp(App)

setupStore(app)
setupRouter(app)
setupModules(app)
app.mount('#app')
