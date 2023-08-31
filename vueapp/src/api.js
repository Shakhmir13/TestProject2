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
	config.headers.Authorization = `Bearer ${token}`
	return config
})

export default HTTP
