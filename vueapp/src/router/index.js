import { createRouter, createWebHistory } from 'vue-router'

import AppLayout from '@/layout/AppLayout.vue'
// import { useAuthStore } from '@/stores/auth.js'
import ForgotPasswordView from '@/views/ForgotPasswordView.vue'
import HomeView from '@/views/HomeView.vue'
import ResetPasswordView from '@/views/ResetPasswordView.vue'
import SignInView from '@/views/SignInView.vue'
import SignUpView from '@/views/SignUpView.vue'

const router = createRouter({
	history: createWebHistory(),

	routes: [
		{
			path: '/',
			name: 'appLayout',
			component: AppLayout,
			meta: {
				auth: false,
			},
			children: [
				{
					path: '/',
					component: HomeView,
				},
			],
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
		{
			path: '/forgot-password',
			name: 'forgotPasswordView',
			component: ForgotPasswordView,
			meta: {
				auth: false,
			},
		},
		{
			path: '/reset',
			name: 'resetPassword',
			component: ResetPasswordView,
			meta: {
				auth: false,
			},
		},
	],
})

// router.beforeEach((to, from, next) => {
// 	const authStore = useAuthStore()

// 	if (to.meta.auth && !authStore.userInfo.token) {
// 		next('/signin')
// 	} else if (!to.meta.auth && authStore.userInfo.token) {
// 		next('/')
// 	} else {
// 		next()
// 	}
// })

export default router
