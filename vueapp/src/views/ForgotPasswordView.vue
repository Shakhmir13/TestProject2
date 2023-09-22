<script setup>
import Loader from '@/components/Loader.vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

import { useAuthStore } from '@/stores/auth.js'
import { ref } from 'vue'

const authStore = useAuthStore()

const email = ref('')
</script>

<template>
	<h2>We will send reset password link to your email</h2>
	<form class="flex flex-column gap-3">
		<div class="p-inputgroup flex-1">
			<InputText type="email" v-model="email" placeholder="Your email" />
		</div>
		<Loader />
		<div class="flex flex-column gap-3">
			<Button
				label="Reset Password"
				@click="authStore.handleForgotPassword(email)"
			/>
		</div>
	</form>
</template>

<style lang="scss" scoped></style>
