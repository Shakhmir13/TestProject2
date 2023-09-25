<script setup>
import Button from 'primevue/button'
import Calendar from 'primevue/calendar'
import InputText from 'primevue/inputtext'

import { useAuthStore } from '@/stores/auth.js'
import { ref } from 'vue'

const authStore = useAuthStore()

const form = ref({
	email: '',
	birthDate: '',
	password: '',
	passwordConfirm: '',
	firstName: '',
	lastName: '',
})
</script>

<template>
	<div class="flex justify-content-center align-content-center flex-wrap pt-5">
		<div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
			<h2 class="mb-5">Sign up</h2>
			<form class="flex flex-column gap-3">
				<div class="p-inputgroup flex-1">
					<InputText
						v-model="form.email"
						type="email"
						placeholder="Your email"
					/>
				</div>

				<div class="p-inputgroup flex-1">
					<Calendar
						v-model="form.birthDate"
						dateFormat="yy-mm-dd"
						placeholder="BirthDate"
					/>
				</div>

				<div class="p-inputgroup flex-1">
					<InputText
						v-model="form.password"
						type="password"
						placeholder="Password"
					/>
				</div>

				<div class="p-inputgroup flex-1">
					<InputText
						v-model="form.passwordConfirm"
						type="password"
						placeholder="Password Confirm"
					/>
				</div>

				<div class="p-inputgroup flex-1">
					<InputText
						v-model="form.firstName"
						type="text"
						placeholder="First Name"
					/>
				</div>

				<div class="p-inputgroup flex-1">
					<InputText
						v-model="form.lastName"
						type="text"
						placeholder="Last Name"
					/>
				</div>

				<div class="flex flex-column gap-3">
					<Button label="Sign up" @click="authStore.handleRegister(form)" />
					<span
						>Are you already registered?
						<router-link to="/signin">Sign in</router-link>
					</span>
				</div>
			</form>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
