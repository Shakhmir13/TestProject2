import axios from 'axios'

export const HTTP = axios.create({
	baseURL: 'http://161.97.110.154/accounts/refresh-token',
	headers: {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${localStorage.getItem('token')}`,
	},
})

export default {
	async getWeather() {
		try {
			const response = await HTTP.get('/WeatherForecast')
			console.log(response.data)
			return response.data
		} catch (error) {
			console.log(error)
		}
	},
}
