<script setup>
import { ref } from 'vue'

import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

const email = ref('')
const password = ref('')

const signup = async () => {
	console.log('test')
}
</script>

<template>
	<h2>Sign up</h2>
	<form class="flex flex-column gap-3">
		<div class="p-inputgroup flex-1">
			<span class="p-inputgroup-addon">
				<i class="pi pi-user"></i>
			</span>
			<InputText type="email" v-model="email" placeholder="Your email" />
		</div>
		<div class="p-inputgroup flex-1">
			<span class="p-inputgroup-addon">
				<i class="pi pi-at"></i>
			</span>
			<InputText type="password" v-model="password" placeholder="Password" />
		</div>
		<div class="flex flex-column gap-3">
			<Button label="Sign up" @click="signup" />
			<span
				>Bro, are you already registered?
				<router-link to="/signin">Sign in</router-link>
			</span>
		</div>
	</form>
</template>

<style lang="scss" scoped></style>
