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

	const signUp = async userData => {
		error.value = ''
		try {
			const response = await HTTP.post('accounts/register', userData)

			userInfo.value = {
				token: response.data.token,
				email: response.data.email,
				username: response.data.username,
				refreshToken: response.data.refreshToken,
			}
			console.log('Из auth.js файла:', response.data)
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
		}
	}

	return { signUp, userInfo, error }
})
