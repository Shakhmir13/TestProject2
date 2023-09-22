<script setup>
import MainBar from '@/components/MainBar.vue'
import SideBar from '@/components/SideBar.vue'

import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'
const authStore = useAuthStore()

const hasToken = computed(() => authStore.authUser.token)

const checkUser = () => {
	const tokens = JSON.parse(localStorage.getItem('userTokens'))
	if (tokens) {
		authStore.authUser.token = tokens.token
		authStore.authUser.refreshToken = tokens.refreshToken
	}
}

checkUser()
</script>

<template>
	<div class="min-h-screen flex relative lg:static surface-ground">
		<SideBar />
		<MainBar />
	</div>

	<router-view />
</template>

<style lang="scss" scoped></style>
