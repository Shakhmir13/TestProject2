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
			{{ shoesStore.name }}
			<template #header>
				<img alt="user header" src="/images/usercard.png" />
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
