<script setup>
import Loader from '@/components/Loader.vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.js'
const authStore = useAuthStore()

const password = ref('')
const passwordConfirm = ref('')

const router = useRouter()

const createNewPassword = async () => {
	const userData = {
		registration: false, // Указываем, что это операция входа
		password: password.value,
		passwordConfirm: passwordConfirm.value,
	}

	await authStore.createNewPassword(userData)
	console.log('Выполнена createNewPassword')
}
</script>

<template>
	<h2>Reset</h2>
	<form class="flex flex-column gap-3">
		<div class="p-inputgroup flex-1">
			<InputText v-model="password" placeholder="New Password" />
		</div>
		<div class="p-inputgroup flex-1">
			<InputText v-model="passwordConfirm" placeholder="Confirm New Password" />
		</div>

		<Loader v-if="authStore.loader" />
		<div v-else class="flex flex-column gap-3">
			<Button label="Create New Password" @click="createNewPassword" />
		</div>
	</form>
</template>

<style lang="scss" scoped></style>
