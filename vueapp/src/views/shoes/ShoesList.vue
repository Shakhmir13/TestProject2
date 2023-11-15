<template>
	<div class="container surface-300">
		<section>Menu</section>
		<section>filters</section>
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
