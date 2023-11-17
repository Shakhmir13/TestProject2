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
					v-for="shoe in shoesStore.shoes"
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
import { onMounted } from 'vue'

const shoesStore = useShoesStore()

// const enteredSearchTerm = ref('')
// const filteredShoes = computed(() => {
// 	const term = searchTerm.value.toLowerCase()
// 	return shoesStore.shoes.filter(shoe => shoe.name.toLowerCase().includes(term))
// })
// function updateSearch(val) {
// 	enteredSearchTerm.value = val
// 	const searchedShoe = shoesStore.shoes.find(shoe => shoe.name === val)
// 	console.log(searchedShoe)
// 	console.log('shoesList fn')
// }

onMounted(async () => {
	await shoesStore.getAllShoes()
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
