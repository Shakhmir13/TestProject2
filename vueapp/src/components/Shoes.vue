<script setup>
import { ref } from 'vue'

import InputText from 'primevue/inputtext'

import { useShoesStore } from '@/stores/shoes.js'
import Button from 'primevue/button'
import Card from 'primevue/card'
import { onMounted } from 'vue'

const shoesStore = useShoesStore()

onMounted(async () => {
	await shoesStore.getAllShoes()
})

const searchShoe = ref('')
</script>

<template>
	<span class="p-input-icon-left px-3 flex gap-2">
		<i class="pi pi-search px-3" />
		<InputText placeholder="Search" v-model="searchShoe" />
		<Button
			icon="pi pi-search"
			@click="shoesStore.getShoesByName(searchShoe)"
		></Button>
	</span>
	<div class="grid">
		<div
			class="col-12 md:col-6 lg:col-3"
			v-for="(shoe, i) in shoesStore.shoes"
			:key="shoe.id"
		>
			<div class="text-center p-3 border-round-sm">
				<Card class="overflow-hidden shadow-5">
					<template #header>
						<img class="w-10" :alt="shoe.name" :src="shoe.imageUrl" />
					</template>

					<template #title>
						<div
							class="flex align-items-center justify-content-between mt-3 mb-2 h-1rem"
						>
							<span
								class="text-left text-900 font-medium text-1xl font-bold text-gray-700"
								>{{ shoe.name }}</span
							>
							<span class="text-900 text-xl ml-3">${{ shoe.price }}</span>
						</div>
					</template>

					<template #content>
						<div class="flex align-items-center justify-content-between">
							<Button
								raised
								rounded
								severity="success"
								icon="pi pi-shopping-bag"
								label="Buy now"
							/>
							<Button
								icon="pi pi-heart"
								severity="warning"
								text
								raised
								rounded
								aria-label="Favorite"
							/>
						</div>
					</template>
				</Card>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
