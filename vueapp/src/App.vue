<script setup>
import { useAuthStore } from '@/stores/auth.js'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const token = computed(() => authStore.userInfo.token)

const checkUser = () => {
	const tokens = JSON.parse(localStorage.getItem('userTokens'))

	if (tokens) {
		authStore.userInfo.token = tokens.token
		authStore.userInfo.refreshToken = tokens.refreshToken
	}
	// console.log('checkUser равен', authStore.userInfo)
}

const logout = () => {
	authStore.logout()
	localStorage.removeItem('userTokens')
	router.push('/signin')
}

checkUser()
</script>

<template>
	<div class="menu">
		<router-link class="menu__link" to="/" v-if="token">Home</router-link>
		<router-link class="menu__link" to="/signin" v-if="!token"
			>Login</router-link
		>
		<router-link class="menu__link" to="/signup" v-if="!token"
			>Signup</router-link
		>
		<router-link
			class="menu__link"
			to="/signin"
			v-if="token"
			@click.prevent="logout"
			>Logout</router-link
		>
	</div>
	<div class="container">
		<router-view />
	</div>
</template>

<style lang="scss" scoped>
.menu {
	display: flex;
	justify-content: center;
	margin-bottom: 20px;
	font-size: 20px;
}
.menu__link {
	color: red;
	margin: 0 20px;
}
// .container {
// 	max-width: 700px;
// 	margin: auto;
// }
</style>
