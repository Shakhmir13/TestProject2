<template>
	<div class="container surface-300">
		<section>Menu</section>
		<div class="product-wrapper">
			<base-button link to="/shoes">back</base-button>
			<div class="product-block">
				<div class="product-block__preview">
					<img :src="selectedShoe.imageUrl" :alt="selectedShoe.name" />
				</div>
				<div class="product-block__content">
					<h2 class="product-title">{{ selectedShoe.name }}</h2>
					<!-- <div class="product-filter">
						Тут будет дополнительный функционал выбора
					</div> -->
					<p class="product-description">{{ selectedShoe.description }}</p>
					<p class="product-price">${{ selectedShoe.price }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useShoesStore } from '@/stores/shoes.js'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const shoesStore = useShoesStore()
const selectedShoe = ref({})

onMounted(async () => {
	await shoesStore.getAllShoes()
	const selectedShoeFromStore = shoesStore.shoes.find(
		shoe => shoe.id === +route.params.id
	)
	selectedShoe.value = selectedShoeFromStore
})
</script>

<style lang="scss" scoped>
.product-wrapper {
	display: flex;
	flex-direction: column;
	border: 1px solid #ccc;
	border-radius: 8px;
	overflow: hidden;
	margin: 20px;
	padding: 20px;
	background-color: #fff;
}

.product-block {
	display: flex;
}

.product-block__preview {
	flex: 1;
	padding: 20px 0;
}

.product-block__preview img {
	width: 100%;
	height: 420px;
	object-fit: cover;
	object-position: bottom right;
}

.product-block__content {
	flex: 1;
	padding: 20px;
}

.product-title {
	font-size: 24px;
	margin-bottom: 10px;
}

.product-filter {
	color: #333;
	background-color: #ffd700;
	padding: 5px 10px;
	border-radius: 5px;
	display: inline-block;
	margin-bottom: 10px;
}

.product-description {
	margin-bottom: 20px;
	line-height: 1.6;
}

.product-price {
	font-size: 18px;
	color: #ff8c00;
	margin-bottom: 20px;
}
</style>
