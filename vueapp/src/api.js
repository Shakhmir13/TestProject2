import BASE_URL from '@/axios'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'

const axiosApiInstance = axios.create({
	baseURL: BASE_URL,
})

axiosApiInstance.interceptors.request.use(config => {
	if (config.url !== '/accounts/login' && config.url !== '/accounts/register') {
		const authStore = useAuthStore()
		const token = authStore.authUser.token
		console.log(token)
		config.headers.Authorization = `Bearer ${token}`
		console.log(config.url === '/accounts/login')
		console.log('Зашел')
	}
	return config
})

export default axiosApiInstance
