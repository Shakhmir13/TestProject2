import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/stores/auth.js'
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
			meta: {
				auth: true,
			},
		},
		{
			path: '/signup',
			name: 'signUp',
			component: SignUpView,
			meta: {
				auth: false,
			},
		},
		{
			path: '/signin',
			name: 'signIn',
			component: SignInView,
			meta: {
				auth: false,
			},
		},
	],
})

router.beforeEach((to, from, next) => {
	const authStore = useAuthStore()

	if (to.meta.auth && !authStore.userInfo.token) {
		next('/signin')
	} else if (!to.meta.auth && authStore.userInfo.token) {
		next('/')
	} else {
		next()
	}
})

export default router
