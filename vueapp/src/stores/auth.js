import config from '@/config.js'
import axios from 'axios'
import { defineStore } from 'pinia'

export const HTTP = axios.create({
	baseURL: config.BASEURL,
})

export const useAuthStore = defineStore('auth', () => {
	const signUp = async userData => {
		try {
			const response = await HTTP.post('accounts/register', userData)
			console.log('Из auth.js файла:', response)
			return response.data
		} catch (error) {
			console.log(error.response)
			throw error
		}
	}

	return { signUp }
})
