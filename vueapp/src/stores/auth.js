import axios from 'axios'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
	state: () => ({
		authUser: null,
	}),
	getters: {
		user: state => state.authUser,
	},
	actions: {
		async handleLogin(data) {
			await axios.post('/accounts/login', {
				email: data.email,
				password: data.password,
			})
			this.router.push('/')
		},

		async handleRegister(data) {
			await axios.post('/accounts/register', {
				email: data.email,
				birthDate: data.birthDate,
				password: data.password,
				passwordConfirm: data.passwordConfirm,
				firstName: data.firstName,
				lastName: data.lastName,
			})
			this.router.push('/')
		},

		async getWeather() {
			if (!this.authUser || !this.authUser.accessToken) {
				console.error('AccessToken не найден.')
				return
			}

			try {
				const headers = {
					Authorization: `Bearer ${authUser.accessToken}`,
				}
				const response = await axios.get('/WeatherForecast', { headers })
				console.log(response.data)
			} catch (error) {
				console.error('Ошибка при получении данных о погоде:', error)
			}
		},
	},
})
