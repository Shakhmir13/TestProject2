<script setup>
import Card from 'primevue/card'

import axios from 'axios'
import { onMounted, ref } from 'vue'

const weathers = ref()

const getWeather = async () => {
	const response = await axios.get('/WeatherForecast')
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
