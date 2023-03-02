import '@unocss/reset/tailwind.css'
import 'uno.css'
import './style/index.less'

import App from './App.vue'
import { createApp } from 'vue'
import { setupRouter } from './router'
import { setupStore } from './store'
import { setupModules } from './modules'

const app = createApp(App)

setupStore(app)
setupRouter(app)
setupModules(app)

app.mount('#app')
