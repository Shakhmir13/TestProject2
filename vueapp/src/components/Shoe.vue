<template>
	<div class="flex flex-column gap-3">
		<Card v-for="(shoe, i) in shoes" :key="i">
			<template #title> {{ shoe.summary }} </template>
			<template #subtitle> {{ shoe.temperatureC }} </template>
		</Card>
	</div>
</template>

<script setup>
import Card from 'primevue/card'

const props = defineProps({
	shoe: {
		type: Object,
		required: true,
		default: () => {},
	},
})
</script>

<style lang="scss" scoped></style>
