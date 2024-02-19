import '@/styles/main.scss'
import 'vue3-toastify/dist/index.css'

import { createApp } from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'
import router from '@/routes'
import vuex from '@/store/index'

import { worker } from './mocks/broswer'

async function prepareApp() {
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    return worker.start()
  }

  return Promise.resolve()
}

const app = createApp(App)

app.use(vuetify)
app.use(vuex)
app.use(router)

prepareApp().then(() => {
  app.mount('#app')
})
