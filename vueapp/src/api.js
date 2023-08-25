import config from '@/config.js'
import axios from 'axios'

export const HTTP = axios.create({
	baseURL: config.BASEURL,
})

export default {
	async getWeather() {
		try {
			const response = await HTTP.get('WeatherForecast/')
			console.log(response.data)
			return response.data
		} catch (error) {
			console.log(error.response)
		}
	},

	async signUp() {
		try {
			const userData = {
				email: 'Test17@test.kz',
				birthDate: '1998-01-26',
				password: 'Q2w3e4r5t6!*',
				passwordConfirm: 'Q2w3e4r5t6!*',
				firstName: 'Nurik',
				lastName: 'Test',
			}

			const response = await HTTP.post('accounts/register', userData)
			console.log(response.data)
			return response.data
		} catch (error) {
			console.log(error.response)
		}
	},
}
