import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/stores/auth.js'

import ForgotPasswordView from '@/views/ForgotPasswordView.vue'
import HomeView from '@/views/HomeView.vue'
import ResetPasswordView from '@/views/ResetPasswordView.vue'
import SignInView from '@/views/SignInView.vue'
import SignUpView from '@/views/SignUpView.vue'
import ShoesDetail from '@/views/shoes/ShoesDetail.vue'
import ShoesList from '@/views/shoes/ShoesList.vue'

const router = createRouter({
	history: createWebHistory(),

	routes: [
		{
			path: '/',
			redirect: '/shoes',
			name: 'HomeView',
			component: HomeView,
			meta: {
				auth: true,
			},
		},
		{
			path: '/shoes',
			name: 'ShoesList',
			component: ShoesList,
			meta: {
				auth: true,
			},
		},
		{
			path: '/shoes/:id',
			props: true,
			name: 'ShoesDetail',
			component: ShoesDetail,
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

router.beforeEach((to, from, next) => {
	const authStore = useAuthStore()

	if (to.meta.auth && !authStore.authUser.token) {
		next('/signin')
	} else if (!to.meta.auth && authStore.authUser.token) {
		next('/')
	} else {
		next()
	}
})

export default router
