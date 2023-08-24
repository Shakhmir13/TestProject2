import axios from 'axios'
import { defineStore } from 'pinia'

const apiKey = 'AIzaSyDnFoxbzuKEuoAYxACl_leEQ-320W7T-xE'

export const useAuthStore = defineStore('auth', () => {
	const signup = async payload => {
		try {
			let response = await axios.post(
				`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
				{
					...payload,
					returnSecureToken: true,
				}
			)
			console.log(response.data)
		} catch (error) {
			console.log(error.response)
		}
	}
	return { signup }
})
