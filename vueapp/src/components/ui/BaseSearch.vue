<template>
	<form>
		<input
			type="search"
			@input="search"
			:value="searchTerm"
			placeholder="Search..."
		/>
	</form>
</template>

<script setup>
const props = defineProps({
	searchTerm: {
		type: String,
	},
})
const emit = defineEmits(['search'])

const search = event => {
	emit('search', event.target.value)
}
</script>

<style scoped>
input {
	font: inherit;
	width: 100%;
	display: block;
	padding: 0.15rem;
	border: 1px solid #ccc;
}

input:focus {
	outline: none;
	border-color: #00006b;
	background-color: #eeeeff;
}
</style>
