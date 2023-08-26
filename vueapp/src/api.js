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
}
