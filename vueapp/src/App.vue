<script setup>
import { ref } from 'vue'

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

const visible = ref(false)
const closeSidebar = () => {
	visible.value = false
}
</script>

<template>
	<router-view />
</template>

<style lang="scss" scoped></style>
