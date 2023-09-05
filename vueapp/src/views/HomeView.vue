<script setup>
import HTTP from '@/api.js' // Импортируйте экземпляр Axios из api.js
import Loader from '@/components/Loader.vue'
import Button from 'primevue/button'
import Card from 'primevue/card'
import { onMounted, ref } from 'vue'

const weathers = ref()
const showLoader = ref(false)

const getWeather = async () => {
	showLoader.value = true
	try {
		const response = await HTTP.get('WeatherForecast/')
		weathers.value = response.data
		console.log('Дата Погоды', response.data)
	} catch (err) {
		console.log('ОШИБКА Погоды', err.response)
	} finally {
		showLoader.value = false
	}
}

onMounted(async () => {
	// console.log('6')
	await getWeather()
	// console.log('7')
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
