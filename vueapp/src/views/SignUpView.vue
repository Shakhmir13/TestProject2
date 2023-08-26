<script setup>
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.js'
const authStore = useAuthStore()

const email = ref('')
const birthDate = ref('')
const password = ref('')
const passwordConfirm = ref('')
const firstName = ref('')
const lastName = ref('')

const router = useRouter()

const handleSignUp = async () => {
	const userData = {
		email: email.value,
		birthDate: birthDate.value,
		password: password.value,
		passwordConfirm: passwordConfirm.value,
		firstName: firstName.value,
		lastName: lastName.value,
	}

	await authStore.signUp(userData)
}
</script>

<template>
	<h2>Sign up</h2>
	<form class="flex flex-column gap-3">
		<Message v-if="authStore.error" severity="warn">{{
			authStore.error
		}}</Message>
		<div class="p-inputgroup flex-1">
			<span class="p-inputgroup-addon">
				<i class="pi pi-user"></i>
			</span>
			<InputText v-model="email" placeholder="Your email" />
		</div>

		<div class="p-inputgroup flex-1">
			<span class="p-inputgroup-addon">
				<i class="pi pi-at"></i>
			</span>
			<InputText v-model="birthDate" placeholder="birthDate" />
		</div>

		<div class="p-inputgroup flex-1">
			<span class="p-inputgroup-addon">
				<i class="pi pi-at"></i>
			</span>
			<InputText v-model="password" placeholder="Password" />
		</div>

		<div class="p-inputgroup flex-1">
			<span class="p-inputgroup-addon">
				<i class="pi pi-at"></i>
			</span>
			<InputText v-model="passwordConfirm" placeholder="password Confirm" />
		</div>

		<div class="p-inputgroup flex-1">
			<span class="p-inputgroup-addon">
				<i class="pi pi-chevron-right"></i>
			</span>
			<InputText v-model="firstName" placeholder="first Name" />
		</div>

		<div class="p-inputgroup flex-1">
			<span class="p-inputgroup-addon">
				<i class="pi pi-chevron-right"></i>
			</span>
			<InputText v-model="lastName" placeholder="last Name" />
		</div>

		<div class="flex flex-column gap-3">
			<Button label="Sign up" @click="handleSignUp" />
			<span
				>Bro, are you already registered?
				<router-link to="/signin">Sign in</router-link>
			</span>
		</div>
	</form>
</template>

<style lang="scss" scoped></style>
