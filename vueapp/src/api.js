import config from '@/config.js'
import axios from 'axios'

export const HTTP = axios.create({
	baseURL: config.BASEURL,
})

// HTTP.interceptors.request

export default {
	async signUp(
		email,
		birthDate,
		password,
		passwordConfirm,
		firstName,
		lastName
	) {
		try {
			const userData = {
				email,
				birthDate,
				password,
				passwordConfirm,
				firstName,
				lastName,
			}

			const response = await HTTP.post('/accounts/register', userData)
			console.log(response.data)
			return response.data
		} catch (error) {
			console.log(error.response)
		}
	},
}
