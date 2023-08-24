import '@/styles/global.scss'

import { initializeApp } from 'firebase/app'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

const firebaseConfig = {
	apiKey: 'AIzaSyDnFoxbzuKEuoAYxACl_leEQ-320W7T-xE',
	authDomain: 'jwt-test-nur.firebaseapp.com',
	projectId: 'jwt-test-nur',
	storageBucket: 'jwt-test-nur.appspot.com',
	messagingSenderId: '60584929277',
	appId: '1:60584929277:web:651d2e868bc47f82031b94',
}

initializeApp(firebaseConfig)

createApp(App).use(createPinia()).use(router).use(PrimeVue).mount('#app')
