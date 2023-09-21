// import './api'
import '@/styles/global.scss'
import './axios'

import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config'
import { createApp, markRaw } from 'vue'

import App from './App.vue'
import router from './router'

const pinia = createPinia()

// pinia.use(({ store }) => {
// 	store.router = markRaw(router)
// })

createApp(App)
	.use(pinia)
	.use(router)
	.use(PrimeVue, { ripple: true })
	.mount('#app')
