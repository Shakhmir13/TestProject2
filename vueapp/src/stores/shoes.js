import axiosApiInstance from '@/api'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useShoesStore = defineStore('shoes', () => {
	const shoes = ref([])

	const getAllShoes = async () => {
		const response = await axiosApiInstance.get('/shoes/GetAllShoes')
		shoes.value = response.data
		console.log(shoes.value)
	}
	return { shoes, getAllShoes }
})
