<script setup>
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'

const authStore = useAuthStore()

const form = ref({
	email: '',
	password: '',
})
</script>

<template>
	<div class="flex justify-content-center align-content-center flex-wrap pt-5">
		<div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
			<h2 class="mb-5">Sign in</h2>
			<form class="flex flex-column gap-3">
				<div class="p-inputgroup flex-1">
					<InputText
						type="email"
						v-model="form.email"
						placeholder="Your email"
					/>
				</div>

				<div class="p-inputgroup flex-1">
					<InputText
						type="password"
						v-model="form.password"
						placeholder="Password"
					/>
				</div>

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
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
