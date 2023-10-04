<script setup>
import { useShoesStore } from '@/stores/shoes.js'
import Card from 'primevue/card'
import { onMounted } from 'vue'

const shoesStore = useShoesStore()

onMounted(async () => {
	await shoesStore.getAllShoes()
})
</script>

<template>
	<div class="flex flex-column gap-3">
		<Card v-for="(shoe, i) in shoesStore.shoes" :key="i">
			<template #header>
				<img :alt="shoe.name" :src="shoe.imageUrl" />
			</template>
			<template #title> {{ shoe.name }} </template>
			<template #subtitle> {{ shoe.price }} </template>
			<template #content>
				<p>{{ shoe.description }}</p>
			</template>
		</Card>
	</div>
</template>

<style lang="scss" scoped></style>
