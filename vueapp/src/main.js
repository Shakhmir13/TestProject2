import '@/styles/global.scss'
import './axios'

import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

// TODO: почитать для чего { ripple: true }
createApp(App)
	.use(createPinia())
	.use(router)
	.use(PrimeVue, { ripple: true })
	.mount('#app')
