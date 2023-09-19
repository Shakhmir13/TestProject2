import HTTP from '@/api.js' // Импортируйте экземпляр Axios из api.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
	const userInfo = ref({
		token: '',
		email: '',
		username: '',
		refreshToken: '',
	})
	const error = ref('')
	const success = ref('')
	const loader = ref(false)

	const auth = async userData => {
		error.value = ''
		loader.value = true
		try {
			let response

			if (userData.registration) {
				// Регистрация: отправляем запрос на регистрацию
				response = await HTTP.post('accounts/register', {
					email: userData.email,
					birthDate: userData.birthDate,
					password: userData.password,
					passwordConfirm: userData.passwordConfirm,
					firstName: userData.firstName,
					lastName: userData.lastName,
				})
			} else {
				response = await HTTP.post('accounts/login', {
					email: userData.email,
					password: userData.password,
				})
			}
			userInfo.value = {
				token: response.data.token,
				email: response.data.email,
				username: response.data.username,
				refreshToken: response.data.refreshToken,
			}

			localStorage.setItem(
				'userTokens',
				JSON.stringify({
					token: userInfo.value.token,
					refreshToken: userInfo.value.refreshToken,
				})
			)
			// console.log('Дата Входа', response.data)
		} catch (err) {
			switch (err.response.data.errors[0]) {
				case 'Пароль не может быть пустым':
					error.value = 'Пароль не может быть пустым'
					break

				case 'Пароли не совпадают':
					error.value = 'Пароли не совпадают'
					break

				case 'Пароль должен содержать минимум 8 символов':
					error.value = 'Пароль должен содержать минимум 8 символов'
					break

				case 'Пароль должен содержать минимум 1 специальный символ':
					error.value = 'Пароль должен содержать минимум 1 специальный символ'
					break

				case 'Пользователь с таким email уже существует':
					error.value = 'Пользователь с таким email уже существует'
					break

				case 'Неверный пароль':
					error.value = 'Неверный пароль'
					break

				case 'Пользователь с таким email не существует':
					error.value = 'Пользователь с таким email не существует'
					break

				default:
					error.value = 'Проверьте данные'
					break
			}

			throw error.value
		} finally {
			loader.value = false
		}
	}

	const resetPassword = async userData => {
		success.value = ''
		loader.value = true
		try {
			const response = await HTTP.post('accounts/request-reset', {
				email: userData.email,
			})
			console.log('Получен resetPassword', response.data)

			// success.value = response.data
			if (response.data) {
				success.value = 'Check your email'
			}
		} catch (err) {
			console.log(err.response)
		} finally {
			loader.value = false
		}
	}

	const createNewPassword = async userData => {
		const route = useRoute()
		loader.value = true
		const email = route.query.Email
		const validCode = route.query.ValidCode

		// Проверка на наличие Email и ValidCode
		if (!email || !validCode) {
			console.log('Email и/или ValidCode отсутствуют в URL')
			loader.value = false // Выход из функции и установка loader в false
			return
		}

		try {
			const response = await HTTP.put('accounts/reset-password', {
				password: userData.password,
				passwordConfirm: userData.passwordConfirm,
				email: email,
				validCode: validCode,
			})
			console.log(response.data)
		} catch (err) {
			console.log(err.response)
		} finally {
			loader.value = false
		}
	}

	const logout = () => {
		userInfo.value = {
			token: '',
			email: '',
			username: '',
			refreshToken: '',
		}
	}
	return {
		auth,
		userInfo,
		error,
		success,
		loader,
		logout,
		resetPassword,
		createNewPassword,
	}
})
