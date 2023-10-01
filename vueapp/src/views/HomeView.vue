<script setup>
import MainBar from '@/components/MainBar.vue'
import SideBar from '@/components/SideBar.vue'

import axiosApiInstance from '@/api'
import { onMounted, ref } from 'vue'

import Card from 'primevue/card'
import Shoes from '../components/Shoes.vue'

const weathers = ref()

const getWeather = async () => {
	const response = await axiosApiInstance.get('/WeatherForecast')
	weathers.value = response.data
}

onMounted(async () => {
	await getWeather()
})
</script>

<template>
	<div class="min-h-screen flex relative lg:static surface-ground">
		<SideBar />
		<MainBar />
	</div>
	<div>
		<Shoes />

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
