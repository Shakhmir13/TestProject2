<script setup>
import { useShoesStore } from '@/stores/shoes.js'
import Card from 'primevue/card'
import { onMounted } from 'vue'

const shoesStore = useShoesStore()

onMounted(async () => {
	await shoesStore.getAllShoes()
	console.log(shoesStore.shoes)
})
</script>

<template>
	<div class="flex flex-column gap-3">
		<Card v-for="(shoe, i) in shoesStore.shoes" :key="i">
			{{ shoesStore.name }}
			<template #title> {{ shoe.name }} </template>
			<template #subtitle> {{ shoe.price }} </template>
		</Card>
	</div>
</template>

<style lang="scss" scoped></style>
