<script setup>
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { ref } from 'vue'

import api from '@/api.js'
import { onMounted } from 'vue'

const email = ref('')
const birthDate = ref('')
const password = ref('')
const passwordConfirm = ref('')
const firstName = ref('')
const lastName = ref('')

onMounted(() => {
	api.getWeather()
	api.signUp()
})
</script>

<template>
	<h2>Sign up</h2>
	<form class="flex flex-column gap-3">
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
			<Button label="Sign up" />
			<span
				>Bro, are you already registered?
				<router-link to="/signin">Sign in</router-link>
			</span>
		</div>
	</form>
</template>

<style lang="scss" scoped></style>
