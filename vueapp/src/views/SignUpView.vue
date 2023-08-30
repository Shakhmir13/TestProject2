<script setup>
import { useVuelidate } from '@vuelidate/core'
import { email, helpers, minLength, sameAs } from '@vuelidate/validators'

import Loader from '@/components/Loader.vue'
import Button from 'primevue/button'
import Calendar from 'primevue/calendar'
import InlineMessage from 'primevue/inlinemessage'
import InputText from 'primevue/inputtext'

import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.js'
const authStore = useAuthStore()

const userEmail = ref('')
const birthDate = ref('')
const password = ref('')
const passwordConfirm = ref('')
const firstName = ref('')
const lastName = ref('')

const rules = computed(() => ({
	password: {
		minLength: minLength(8),
	},
	userEmail: {
		email: email,
	},
	passwordConfirm: {
		sameAsPassword: helpers.withMessage(
			'Пароли не совпадают',
			sameAs(password.value)
		),
	},
}))

const v = useVuelidate(rules, { password, userEmail, passwordConfirm })
console.log(v)

const router = useRouter()

const handleSignUp = async () => {
	const userData = {
		registration: true, // операция регистрации
		email: userEmail.value,
		birthDate: birthDate.value,
		password: password.value,
		passwordConfirm: passwordConfirm.value,
		firstName: firstName.value,
		lastName: lastName.value,
	}

	await authStore.auth(userData)
	router.push('/')
}
</script>

<template>
	<h2>Sign up</h2>
	<form class="flex flex-column gap-3">
		<div class="p-inputgroup flex-1">
			<InputText v-model="v.userEmail.$model" placeholder="Your email" />
			<InlineMessage v-for="error in v.userEmail.$errors" :key="error.$uid">
				{{ error.$message }}
			</InlineMessage>
		</div>

		<div class="p-inputgroup flex-1">
			<Calendar
				v-model="birthDate"
				dateFormat="yy-mm-dd"
				placeholder="BirthDate"
			/>
		</div>

		<div class="p-inputgroup flex-1">
			<InputText v-model="v.password.$model" placeholder="Password" />
			<InlineMessage v-for="error in v.password.$errors" :key="error.$uid">{{
				error.$message
			}}</InlineMessage>
		</div>

		<div class="p-inputgroup flex-1">
			<InputText
				v-model="v.passwordConfirm.$model"
				placeholder="Password Confirm"
			/>
			<InlineMessage
				v-for="error in v.passwordConfirm.$errors"
				:key="error.$uid"
				>{{ error.$message }}</InlineMessage
			>
		</div>

		<div class="p-inputgroup flex-1">
			<InputText v-model="firstName" placeholder="First Name" />
		</div>

		<div class="p-inputgroup flex-1">
			<InputText v-model="lastName" placeholder="Last Name" />
		</div>

		<Loader v-if="authStore.loader" />
		<div v-else class="flex flex-column gap-3">
			<Button label="Sign up" @click="handleSignUp" />
			<span
				>Bro, are you already registered?
				<router-link to="/signin">Sign in</router-link>
			</span>
		</div>
	</form>
</template>

<style lang="scss" scoped></style>
