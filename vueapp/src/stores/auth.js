import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router' // Import the useRouter function

// import axiosApiInstance from '@/api' понадобится если будут ошибки
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
	const authUser = ref({
		token: '',
		email: '',
		username: '',
		refreshToken: '',
	})

	const authError = ref('')
	const authSuccess = ref('')
	const loader = ref(false)

	const router = useRouter()

	const handleLogin = async data => {
		authError.value = ''
		loader.value = true
		try {
			const response = await axios.post('/accounts/login', {
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
		} catch (err) {
			authError.value = err.response.data.errors[0]
		} finally {
			loader.value = false
		}
	}

	const handleRegister = async data => {
		authError.value = ''
		loader.value = true
		try {
			const response = await axios.post('/accounts/register', {
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
		} catch (err) {
			authError.value = err.response.data.errors[0]
		} finally {
			loader.value = false
		}
	}

	const handleForgotPassword = async email => {
		authSuccess.value = ''
		loader.value = true
		try {
			const response = await axios.post('/accounts/request-reset', {
				email: email,
			})
			console.log(response.data)
			authSuccess.value = response.data
			// router.push('/')
		} catch (err) {
			console.log(err.response.data.errors[0])
			authError.value = err.response.data.errors[0]
		} finally {
			loader.value = false
		}
	}

	const handleResetPassword = async resetData => {
		authSuccess.value = ''
		loader.value = true
		try {
			const response = await axios.post('/accounts/reset-password', resetData)
			console.log(response.data)
			router.push('/')
		} catch (error) {
			console.log(error)
		} finally {
			loader.value = false
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
		authError,
		authSuccess,
		loader,
		handleLogin,
		handleRegister,
		handleForgotPassword,
		handleResetPassword,
		logout,
	}
})
