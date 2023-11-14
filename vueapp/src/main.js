import '@/styles/global.scss'
import './api'
import './axios'

import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

const pinia = createPinia()

createApp(App)
	.use(pinia)
	.use(router)
	.use(PrimeVue, { ripple: true })
	.mount('#app')
