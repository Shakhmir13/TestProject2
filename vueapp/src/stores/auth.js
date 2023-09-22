import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router' // Import the useRouter function

import axiosApiInstance from '@/api'

export const useAuthStore = defineStore('auth', () => {
	const authUser = ref({
		token: '',
		email: '',
		username: '',
		refreshToken: '',
	})

	const router = useRouter()

	const handleLogin = async data => {
		try {
			const response = await axiosApiInstance.post('/accounts/login', {
				email: data.email,
				password: data.password,
			})
			authUser.value = {
				token: response.data.token,
				email: response.data.email,
				username: response.data.username,
				refreshToken: response.data.refreshToken,
			}
			router.push('/')
			console.log(authUser.value)

			localStorage.setItem(
				'userTokens',
				JSON.stringify({
					token: authUser.value.token,
					refreshToken: authUser.value.refreshToken,
				})
			)
		} catch (error) {
			console.log(error)
		}
	}

	const handleRegister = async data => {
		try {
			const response = await axiosApiInstance.post('/accounts/register', {
				email: data.email,
				birthDate: data.birthDate,
				password: data.password,
				passwordConfirm: data.passwordConfirm,
				firstName: data.firstName,
				lastName: data.lastName,
			})
			authUser.value = {
				token: response.data.token,
				email: response.data.email,
				username: response.data.username,
				refreshToken: response.data.refreshToken,
			}
			console.log(authUser.value)
			router.push('/')

			localStorage.setItem(
				'userTokens',
				JSON.stringify({
					token: authUser.value.token,
					refreshToken: authUser.value.refreshToken,
				})
			)
		} catch (error) {
			console.log(error)
		}
	}

	const handleForgotPassword = async email => {
		try {
			const response = await axiosApiInstance.post('/accounts/request-reset', {
				email: email,
			})
			console.log(response.data)
			router.push('/')
		} catch (error) {
			console.log(error)
		}
	}

	const handleResetPassword = async resetData => {
		try {
			const response = await axiosApiInstance.post(
				'/accounts/reset-password',
				resetData
			)
			console.log(response.data)
			router.push('/')
		} catch (error) {
			console.log(error)
		}
	}

	const logout = () => {
		authUser.value = {
			token: '',
			email: '',
			username: '',
			refreshToken: '',
		}
		localStorage.removeItem('userTokens')
		router.push('/signin')
	}

	return {
		authUser,
		handleLogin,
		handleRegister,
		handleForgotPassword,
		handleResetPassword,
		logout,
	}
})
