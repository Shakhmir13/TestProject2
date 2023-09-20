<script setup>
import Loader from '@/components/Loader.vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'

import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'

const authStore = useAuthStore()

const form = ref({
	email: '',
	password: '',
})
</script>

<template>
	<h2>Sign in</h2>
	<form class="flex flex-column gap-3">
		<Message severity="warn"></Message>
		<div class="p-inputgroup flex-1">
			<InputText type="email" v-model="form.email" placeholder="Your email" />
		</div>

		<div class="p-inputgroup flex-1">
			<InputText
				type="password"
				v-model="form.password"
				placeholder="Password"
			/>
		</div>

		<Loader />
		<div class="flex flex-column gap-3">
			<Button label="Sign in" @click="authStore.handleLogin(form)" />
			<span
				>Are you not registered yet?
				<router-link to="/signup">Sign up</router-link>
			</span>
			<span
				>Forget password?
				<router-link to="/forgot-password">Reset Password</router-link>
			</span>
		</div>
	</form>
</template>

<style lang="scss" scoped></style>
