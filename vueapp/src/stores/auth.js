import axios from 'axios'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
	state: () => ({
		authUser: null,
	}),
	getters: {
		user: state => state.authUser,
	},
	actions: {
		async handleLogin(data) {
			const response = await axios.post('/accounts/login', {
				email: data.email,
				password: data.password,
			})
			this.authUser = response.data
			console.log(this.authUser)
			console.log(this.authUser.token)
			this.router.push('/')
		},

		async handleRegister(data) {
			const response = await axios.post('/accounts/register', {
				email: data.email,
				birthDate: data.birthDate,
				password: data.password,
				passwordConfirm: data.passwordConfirm,
				firstName: data.firstName,
				lastName: data.lastName,
			})
			this.authUser = response.data
			this.router.push('/')
		},
	},
})
