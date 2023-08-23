import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/lara-light-indigo/theme.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

import PrimeVue from 'primevue/config'

createApp(App).use(router).use(PrimeVue).mount('#app')
