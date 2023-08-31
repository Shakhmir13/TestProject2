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
const password = ref('')

const router = useRouter()

const handleSignUp = async () => {
	const userData = {
		registration: false, // Указываем, что это операция входа
		email: email.value,
		password: password.value,
	}

	await authStore.auth(userData)
	router.push('/')
}
</script>

<template>
	<h2>Sign in</h2>
	<form class="flex flex-column gap-3">
		<Message severity="warn" v-if="authStore.error">{{
			authStore.error
		}}</Message>
		<div class="p-inputgroup flex-1">
			<InputText v-model="email" placeholder="Your email" />
		</div>

		<div class="p-inputgroup flex-1">
			<InputText v-model="password" placeholder="Password" />
		</div>

		<Loader v-if="authStore.loader" />
		<div v-else class="flex flex-column gap-3">
			<Button label="Sign in" @click="handleSignUp" />
			<span
				>Are you not registered yet?
				<router-link to="/signup">Sign up</router-link>
			</span>
		</div>
	</form>
</template>

<style lang="scss" scoped></style>
