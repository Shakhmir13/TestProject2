<script setup>
// const logout = () => {
// 	authStore.logout()
// 	localStorage.removeItem('userTokens')
// 	router.push('/signin')
// }
</script>

<template>
	<div class="menu">
		<router-link class="menu__link" to="/">Home</router-link>
		<router-link class="menu__link" to="/signin">Login</router-link>
		<router-link class="menu__link" to="/signup">Signup</router-link>
		<router-link class="menu__link" to="/signin">Logout</router-link>
	</div>
	<div class="container">
		<router-view />
	</div>
</template>

<style lang="scss" scoped>
// .menu {
// 	display: flex;
// 	justify-content: center;
// 	margin-bottom: 20px;
// 	font-size: 20px;
// }
// .menu__link {
// 	color: red;
// 	margin: 0 20px;
// }
// .container {
// 	max-width: 700px;
// 	margin: auto;
// }
</style>
