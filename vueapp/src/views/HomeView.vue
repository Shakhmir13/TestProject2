<script setup>
import Loader from '@/components/Loader.vue'
import Button from 'primevue/button'
import Card from 'primevue/card'

import { useAuthStore } from '@/stores/auth.js'
import { onMounted, ref } from 'vue'
const authStore = useAuthStore()

import config from '@/config.js'
import axios from 'axios'
const HTTP = axios.create({
	baseURL: config.BASEURL,
})
const token = authStore.userInfo.token
HTTP.defaults.headers.common['Authorization'] = `Bearer ${token}`

const weathers = ref()
const showLoader = ref(false)

const getWeather = async () => {
	showLoader.value = true
	try {
		const response = await HTTP.get('WeatherForecast/')
		weathers.value = response.data
	} catch (error) {
		console.log(error.response)
	} finally {
		showLoader.value = false
	}
}

onMounted(async () => {
	await getWeather()
})
</script>

<template>
	<h2>Добро пожаловать Нурик</h2>
	<Button label="Submit" />
	<div>
		<h2>Weather</h2>
		<Loader v-if="showLoader" />
		<div class="flex flex-column gap-3">
			<Card v-for="(weather, i) in weathers" :key="i">
				<template #title> {{ weather.summary }} </template>
				<template #subtitle> {{ weather.temperatureC }} </template>
			</Card>
		</div>
	</div>

	<router-link to="/signup">это ссылка на страницу регистрации</router-link>
</template>

<style scoped></style>
