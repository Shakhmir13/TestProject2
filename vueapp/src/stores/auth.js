import config from '@/config.js'
import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const HTTP = axios.create({
	baseURL: config.BASEURL,
})

export const useAuthStore = defineStore('auth', () => {
	const userInfo = ref({
		token: '',
		email: '',
		username: '',
		refreshToken: '',
	})

	const error = ref('')
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
			console.log('Из auth.js файла:', response.data)
			loader.value = false
		} catch (err) {
			console.log(err.response.data.lastName)
			switch (err.response.data.lastName) {
				case 'Berikbolov':
					error.value = 'Берикболов уже есть тут'
					break
				default:
					error.value = 'Какая-то ошибка'
					break
			}
			loader.value = false
		}
	}

	return { auth, userInfo, error, loader }
})
