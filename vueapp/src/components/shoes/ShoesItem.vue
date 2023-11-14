<template>
	<li>
		<img :src="imageUrl" :alt="name" />
		<div class="info">
			<h3>Name: {{ name }}</h3>
			<!-- <p>Description: {{ description }}</p> -->
			<p>Price: {{ price }} $</p>
		</div>
	</li>
</template>

<script setup>
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
</script>

<style lang="scss" scoped>
li {
	width: 250px;
	background-color: #fff;
	border: 1px solid #ddd;
	border-radius: 8px;
	overflow: hidden;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
img {
	width: 250px;
	height: auto;
	border-bottom: 1px solid #ddd;
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
