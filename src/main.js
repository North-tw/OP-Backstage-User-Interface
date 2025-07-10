import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import axios from 'axios'
import VueAxios from 'vue-axios'
import '@/assets/styles/all.scss'
import { useIcon } from '@/helpers/useIcon.js'
import { useMixin } from '@/helpers/useMixin.js'
import { useDateFormat } from '@/helpers/useDateFormat.js'
import AppIcon from '@/components/AppIcon'

const { imageLoadError } = useMixin()

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app
  .use(pinia)
  .use(router)
  .use(VueAxios, axios)
  .use(useIcon)
  .use(useDateFormat)
  .mixin(imageLoadError)
  .component('AppIcon', AppIcon)
  .mount('#app')
