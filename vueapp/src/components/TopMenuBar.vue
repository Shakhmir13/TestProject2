<template>
	<div class="card flex justify-content-center">
		<Sidebar v-model:visible="visible">
			<h2>Sidebar</h2>
		</Sidebar>
		<Button icon="pi pi-arrow-right" @click="visible = true" />
	</div>
</template>

<script setup>
import Button from 'primevue/button'
import Sidebar from 'primevue/sidebar'

import { ref } from 'vue'

const visible = ref(false)
</script>

<style lang="scss" scoped></style>
