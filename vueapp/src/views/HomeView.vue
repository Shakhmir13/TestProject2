<script setup>
import Card from 'primevue/card'

import { useAuthStore } from '@/stores/auth'
import axios from 'axios'
import { onMounted, ref } from 'vue'

const authStore = useAuthStore()

const weathers = ref()

const getWeather = async () => {
	const token = authStore.user.token
	const headers = {
		Authorization: `Bearer ${token}`,
	}

	const response = await axios.get('/WeatherForecast', { headers })
	weathers.value = response.data
	console.log(response.data)
}

onMounted(async () => {
	await getWeather()
})
</script>

<template>
	<div>
		<h2>Weather</h2>

		<div class="flex flex-column gap-3">
			<Card v-for="(weather, i) in weathers" :key="i">
				<template #title> {{ weather.summary }} </template>
				<template #subtitle> {{ weather.temperatureC }} </template>
			</Card>
		</div>
	</div>
</template>

<style scoped></style>
