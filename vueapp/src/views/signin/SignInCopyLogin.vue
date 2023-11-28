<template>
	<div
		class="flex flex-column surface-card p-4 shadow-2 border-round w-full lg:w-4 gap-1"
	>
		<span class="font-bold text-lg">For guest:</span>
		<div class="font-bold flex gap-2 align-items-center">
			<span class="font-bold">Login:</span>
			<span class="font-normal">{{ loginCopy }}</span>
			<Button
				label="Login"
				icon="pi pi-copy"
				size="small"
				@click="copyText(loginCopy)"
			/>
		</div>
		<div class="font-bold flex gap-2 align-items-center">
			<span class="font-bold">Password:</span>
			<span class="font-normal">{{ passwordCopy }}</span>
			<Button
				label="Password"
				icon="pi pi-copy"
				size="small"
				@click="copyText(passwordCopy)"
			/>
		</div>
	</div>
</template>

<script setup>
import Button from 'primevue/button'
import { ref } from 'vue'

const loginCopy = ref('admin@admin.kz')
const passwordCopy = ref('Qwerty123!')

const copyText = val => {
	navigator.clipboard.writeText(val)
}
</script>

<style lang="scss" scoped></style>
