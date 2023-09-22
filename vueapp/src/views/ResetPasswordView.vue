<script setup>
import Loader from '@/components/Loader.vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

import { useAuthStore } from '@/stores/auth.js'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const authStore = useAuthStore()
const route = useRoute()

const form = ref({
	password: '',
	passwordConfirm: '',
	email: route.query.email,
	validCode: route.query.validCode,
})
</script>

<template>
	<h2>Reset</h2>
	<form class="flex flex-column gap-3">
		<div class="p-inputgroup flex-1">
			<InputText
				v-model="form.password"
				type="password"
				placeholder="New Password"
			/>
		</div>
		<div class="p-inputgroup flex-1">
			<InputText
				v-model="form.passwordConfirm"
				type="password"
				placeholder="Confirm New Password"
			/>
		</div>

		<Loader />
		<div class="flex flex-column gap-3">
			<Button
				label="Create New Password"
				@click="authStore.handleResetPassword(form)"
			/>
		</div>
	</form>
</template>

<style lang="scss" scoped></style>
