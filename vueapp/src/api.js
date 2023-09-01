// api.js
import config from '@/config.js'
import { useAuthStore } from '@/stores/auth.js'
import axios from 'axios'
import router from './router'

const HTTP = axios.create({
	baseURL: config.BASEURL,
})

HTTP.interceptors.request.use(config => {
	const authStore = useAuthStore()
	const token = authStore.userInfo.token
	config.headers = {
		Authorization: `Bearer ${token}`,
		Accept: 'application/json',
	}
	console.log(config)
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
					accessToken: JSON.parse(localStorage.getItem('userTokens')).token,
				})

				console.log('newTokens data:', newTokens.data)

				authStore.userInfo.token = newTokens.data.accessToken
				authStore.userInfo.refreshToken = newTokens.data.refreshToken

				localStorage.setItem(
					'userTokens',
					JSON.stringify({
						token: newTokens.data.accessToken,
						refreshToken: newTokens.data.refreshToken,
					})
				)
				// TODO: доделать обновление токена в теле запроса
				// Обновляем заголовок в originalRequest
				originalRequest.headers.Authorization = `Bearer ${newTokens.data.accessToken}`
				// Повторно отправляем originalRequest с актуальными токенами
				return HTTP(originalRequest)
			} catch (err) {
				console.log('ЭТО ошибка в newTokens', err)
				localStorage.removeItem('userTokens')
				router.push('/signin')
				authStore.userInfo.token = ''
				authStore.userInfo.refreshToken = ''
			}
		}
	}
)

export default HTTP
