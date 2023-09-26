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
	email: route.query.Email,
	validCode: route.query.ValidCode,
})
</script>

<template>
	<div class="flex justify-content-center align-content-center flex-wrap pt-5">
		<div class="surface-card p-4 shadow-2 border-round w-full lg:w-4">
			<h2>Reset Password</h2>
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

				<Loader v-if="authStore.loader" />
				<div v-else class="flex flex-column gap-3">
					<Button
						label="Create New Password"
						@click="authStore.handleResetPassword(form)"
					/>
				</div>
			</form>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
