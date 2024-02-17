import { createApp } from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'
import router from '@/routes'
import { pinia } from '@/store'

const app = createApp(App)

app.use(vuetify)
app.use(pinia)
app.use(router)

app.mount('#app')
