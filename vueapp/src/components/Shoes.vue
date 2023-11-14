<script setup>
import { useShoesStore } from '@/stores/shoes.js'
import { onMounted } from 'vue'

const shoesStore = useShoesStore()

onMounted(async () => {
	await shoesStore.getAllShoes()
})
</script>

<template></template>

<style lang="scss" scoped></style>
