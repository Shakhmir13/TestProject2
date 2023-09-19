<script setup>
import Loader from '@/components/Loader.vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'

import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
	email: '',
	password: '',
})

const handleLogin = async () => {
	await axios.post('/accounts/login', {
		email: form.value.email,
		password: form.value.password,
	})
	router.push('/')
}
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
			<Button label="Sign in" @click="handleLogin" />
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
