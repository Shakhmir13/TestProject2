import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import SignInView from '@/views/SignInView.vue'

const router = createRouter({
	history: createWebHistory(),

	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
		},
		{
			path: '/sign-in',
			name: 'signIn',
			component: SignInView,
		},
	],
})

export default router
