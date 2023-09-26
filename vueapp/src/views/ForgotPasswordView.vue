<script setup>
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'

import Loader from '@/components/Loader.vue'

import { useAuthStore } from '@/stores/auth.js'
import { ref } from 'vue'

const authStore = useAuthStore()

const email = ref('')
</script>

<template>
	<div class="flex justify-content-center align-content-center flex-wrap pt-5">
		<div class="surface-card p-4 shadow-2 border-round w-full lg:w-4">
			<h2>Write your email</h2>
			<Message v-if="authStore.authSuccess" severity="success">{{
				authStore.authSuccess
			}}</Message>
			<form class="flex flex-column gap-3">
				<div class="p-inputgroup flex-1">
					<InputText type="email" v-model="email" placeholder="Your email" />
				</div>
				<Loader v-if="authStore.loader" />
				<div v-else class="flex flex-column gap-3">
					<Button
						label="Reset Password"
						@click="authStore.handleForgotPassword(email)"
					/>
				</div>
			</form>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
