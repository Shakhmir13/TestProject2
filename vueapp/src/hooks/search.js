import { computed, ref, watch } from 'vue'

export default function useSearch(items, searchProp1, searchProp2) {
	const enteredSearchTerm = ref('')
	const activeSearchTerm = ref('')

	const filteredItems = computed(() => {
		if (activeSearchTerm.value) {
			return items.filter(
				item =>
					item[searchProp1]
						.toLowerCase()
						.includes(activeSearchTerm.value.toLowerCase()) ||
					item[searchProp2]
						.toLowerCase()
						.includes(activeSearchTerm.value.toLowerCase())
			)
		} else {
			return items
		}
	})

	const updateSearch = val => {
		enteredSearchTerm.value = val
	}

	watch(enteredSearchTerm, function (newValue) {
		setTimeout(() => {
			if (newValue === enteredSearchTerm.value) {
				activeSearchTerm.value = newValue
			}
		}, 300)
	})

	return {
		enteredSearchTerm,
		filteredItems,
		updateSearch,
	}
}
