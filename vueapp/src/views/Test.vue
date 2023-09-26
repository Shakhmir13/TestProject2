<template>
	<div class="card flex justify-content-center">
		<Toast />
		<Button label="Show" @click="handleClick" />
	</div>
</template>

<script setup>
import Button from 'primevue/button'
import Toast from 'primevue/toast'

import { useToast } from 'primevue/usetoast'
const toast = useToast()

const show = () => {
	toast.add({
		severity: 'info',
		summary: 'Info',
		detail: 'Message Content',
		life: 5000,
	})
}

const second = () => {
	console.log('nur')
}

const handleClick = () => {
	show()
	second()
}
</script>

<style lang="scss" scoped></style>
