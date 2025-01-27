import { createApp } from 'vue'

import App from './App.vue'
import { setupModules } from './modules'
import { setupRouter } from './router'
import { setupStore } from './store'

import '~console/theme-detect'

import 'nprogress-v2/dist/index.css'
import '@unocss/reset/tailwind.css'
import 'uno.css'

import './style/index.less'

const app = createApp(App)

setupStore(app)
setupRouter(app)
setupModules(app)
app.mount('#app')
