// api.js
import config from '@/config.js'
import { useAuthStore } from '@/stores/auth.js'
import axios from 'axios'

const HTTP = axios.create({
	baseURL: config.BASEURL,
})

HTTP.interceptors.request.use(config => {
	const authStore = useAuthStore()
	const token = authStore.userInfo.token
	if (token) {
		// TODO: убрать 'v' не забыть
		config.headers.Authorization = `Bearer ${token + 'v'}`
	}
	return config
})

HTTP.interceptors.response.use(
	response => {
		return response
	},
	async function (error) {
		const authStore = useAuthStore()
		const originalRequest = error.config
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true
			try {
				const newTokens = await HTTP.post('accounts/refresh-token', {
					refreshToken: JSON.parse(localStorage.getItem('userTokens'))
						.refreshToken,
					token: JSON.parse(localStorage.getItem('userTokens')).token,
				})

				console.log('newTokens data:', newTokens)
			} catch (err) {
				console.log('ЭТО ошибка в newTokens', err)
			}
		}
	}
)

export default HTTP
