<template>
	<section>
		<slot></slot>
	</section>
</template>

<style scoped>
section {
	display: flex;
	flex-direction: column;
	border: 1px solid #ccc;
	border-radius: 8px;
	overflow: hidden;
	margin: 20px;
	padding: 20px;
	background-color: #fff;
}
</style>
