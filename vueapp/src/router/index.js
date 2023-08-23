import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import SignInView from '@/views/SignInView.vue'
import SignUpView from '@/views/SignUpView.vue'

const router = createRouter({
	history: createWebHistory(),

	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
		},
		{
			path: '/signup',
			name: 'signUp',
			component: SignUpView,
		},
		{
			path: '/signin',
			name: 'signIn',
			component: SignInView,
		},
	],
})

export default router
