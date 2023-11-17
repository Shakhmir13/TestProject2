import '@/styles/global.scss'
import './api'
import './axios'

import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config'
import { createApp } from 'vue'

import BaseButton from '@/components/ui/BaseButton.vue'
import BaseSearch from '@/components/ui/BaseSearch.vue'
import BaseContainer from '@/components/ui/BaseContainer.vue'

import App from './App.vue'
import router from './router'

const pinia = createPinia()

createApp(App)
	.use(pinia)
	.use(router)
	.use(PrimeVue, { ripple: true })
	.component('base-button', BaseButton)
	.component('base-search', BaseSearch)
	.component('base-container', BaseContainer)
	.mount('#app')
