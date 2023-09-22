import BASE_URL from '@/axios'
import router from '@/router/index'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'

const axiosApiInstance = axios.create({
	baseURL: BASE_URL,
})

axiosApiInstance.interceptors.request.use(config => {
	if (config.url !== '/accounts/login' && config.url !== '/accounts/register') {
		const authStore = useAuthStore()
		const token = authStore.authUser.token
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

axiosApiInstance.interceptors.response.use(
	response => {
		return response
	},
	async function (error) {
		const authStore = useAuthStore()
		const originalRequest = error.config
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true
			try {
				const newTokens = await axios.post('/accounts/refresh-token', {
					refreshToken: JSON.parse(localStorage.getItem('userTokens'))
						.refreshToken,
					accessToken: JSON.parse(localStorage.getItem('userTokens')).token,
				})
				console.log('Дата NewTokens:', newTokens.data)

				authStore.authUser.token = newTokens.data.accessToken
				authStore.authUser.refreshToken = newTokens.data.refreshToken

				localStorage.setItem(
					'userTokens',
					JSON.stringify({
						token: newTokens.data.accessToken,
						refreshToken: newTokens.data.refreshToken,
					})
				)
				return axiosApiInstance(originalRequest)
			} catch (err) {
				console.log('ЭТО ошибка в newTokens', err)
				localStorage.removeItem('userTokens')
				router.push('/signin')
				authStore.userInfo.token = ''
				authStore.userInfo.refreshToken = ''
			}
		}
		console.log(error)
	}
)

export default axiosApiInstance
