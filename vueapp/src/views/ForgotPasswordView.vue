<script setup>
import Loader from '@/components/Loader.vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'

import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.js'
const authStore = useAuthStore()

const email = ref('')
// const successMessage = computed(() => authStore.userInfo.token)

const router = useRouter()

const resetPassword = async () => {
	const userData = {
		registration: false, // Указываем, что это операция входа
		email: email.value,
	}

	await authStore.resetPassword(userData)

	// router.push('/signin')
}
</script>

<template>
	<h2>We will send reset password link to your email</h2>
	<form class="flex flex-column gap-3">
		<Message severity="success" v-if="authStore.success">{{
			authStore.success
		}}</Message>
		<div class="p-inputgroup flex-1">
			<InputText v-model="email" placeholder="Your email" />
		</div>
		<Loader v-if="authStore.loader" />
		<div v-else class="flex flex-column gap-3">
			<Button label="Reset Password" @click="resetPassword" />
		</div>
	</form>
</template>

<style lang="scss" scoped></style>
