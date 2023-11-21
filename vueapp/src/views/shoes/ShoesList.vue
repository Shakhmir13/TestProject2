<template>
	<div class="container surface-300">
		<section>Menu</section>
		<base-container>
			<base-search
				@search="updateSearch"
				:search-term="enteredSearchTerm"
			></base-search>
		</base-container>
		<section>
			<ul>
				<shoes-item
					v-for="shoe in filteredShoes"
					:key="shoe.id"
					:id="shoe.id"
					:name="shoe.name"
					:description="shoe.description"
					:imageUrl="shoe.imageUrl"
					:price="shoe.price"
				></shoes-item>
			</ul>
		</section>
	</div>
</template>

<script setup>
import ShoesItem from '@/components/shoes/ShoesItem.vue'

import { useShoesStore } from '@/stores/shoes.js'
import { computed, onMounted, ref, watch } from 'vue'

const shoesStore = useShoesStore()

const enteredSearchTerm = ref('')
const activeSearchTerm = ref('')

// Фильтрация массива обуви на основе введенного поискового запроса
const filteredShoes = computed(() => {
	if (activeSearchTerm.value) {
		return shoesStore.shoes.filter(
			shoe =>
				shoe.name
					.toLowerCase()
					.includes(activeSearchTerm.value.toLowerCase()) ||
				shoe.manufacturer.name
					.toLowerCase()
					.includes(activeSearchTerm.value.toLowerCase())
		)
	} else {
		return shoesStore.shoes
	}
})

// Метод для обновления поискового запроса
const updateSearch = val => {
	enteredSearchTerm.value = val
}

watch(enteredSearchTerm, function (newValue) {
	setTimeout(() => {
		if (newValue === enteredSearchTerm.value) {
			activeSearchTerm.value = newValue
		}
	}, 300)
})

onMounted(async () => {
	await shoesStore.getAllShoes()
	// const selectedShoeFromStore = shoesStore.shoes
	// console.log(selectedShoeFromStore)
})
</script>

<style lang="scss" scoped>
ul {
	list-style: none;
	margin: 0;
	padding: 0;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 20px;
}
</style>
