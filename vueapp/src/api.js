import { useAuthStore } from '@/stores/auth'
import axios from 'axios'

axios.interceptors.request.use(config => {
	const authStore = useAuthStore()
	const token = authStore.authUser.token
	console.log(token)
	config.headers.Authorization = `Bearer ${token}`
	return config
})
