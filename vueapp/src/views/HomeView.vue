<script setup>
import { useAuthStore } from '@/stores/auth'
import { onMounted, ref } from 'vue'

const authStore = useAuthStore()

const weathers = ref()

onMounted(async () => {
	await authStore.getWeather()
})
</script>

<template>
	<div>
		<h2>Weather</h2>
		<!-- <Loader />
		<div class="flex flex-column gap-3">
			<Card v-for="(weather, i) in weathers" :key="i">
				<template #title> {{ weather.summary }} </template>
				<template #subtitle> {{ weather.temperatureC }} </template>
			</Card>
		</div> -->
	</div>
</template>

<style scoped></style>
