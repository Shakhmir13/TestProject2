import '@/styles/global.scss'

import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

createApp(App).use(createPinia()).use(router).use(PrimeVue).mount('#app')
