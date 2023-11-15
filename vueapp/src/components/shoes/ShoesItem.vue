<template>
	<li>
		<router-link :to="shoesDetailsLink">
			<img :src="imageUrl" :alt="name" />
			<div class="info">
				<h3>Name: {{ name }}</h3>
				<p>Price: {{ price }} $</p>
			</div>
		</router-link>
	</li>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
	id: {
		type: Number,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	imageUrl: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
})

const shoesDetailsLink = computed(() => {
	return `/shoes/${props.id}`
})
</script>

<style lang="scss" scoped>
li {
	width: 250px;
	background-color: #fff;
	border: 1px solid #ddd;
	border-radius: 8px;
	overflow: hidden;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	padding: 10px;
}
img {
	width: 100%;
	height: 180px;
	object-fit: cover;
	object-position: bottom right;
}

.card .info {
	padding: 10px;
}

.card h3 {
	margin: 0;
	font-size: 18px;
	color: #333;
}

.card p {
	margin: 10px 0 0;
	font-size: 14px;
	color: #777;
}
</style>
