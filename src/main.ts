import '@unocss/reset/tailwind.css'
import 'uno.css'
import './style/index.less'

import { createApp } from 'vue'

import App from './App.vue'
import { setupModules } from './modules'
import { setupRouter } from './router'
import { setupStore } from './store'

const app = createApp(App)

setupStore(app)
setupRouter(app)
setupModules(app)

app.mount('#app')
