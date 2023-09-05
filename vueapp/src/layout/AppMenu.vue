<script setup>
import { ref } from 'vue'

import AppMenuItem from './AppMenuItem.vue'

const model = ref([
	{
		label: 'Home',
		items: [{ label: 'Weather', icon: 'pi pi-fw pi-home', to: '/' }],
	},

	{
		label: 'Pages',
		icon: 'pi pi-fw pi-briefcase',
		to: '/pages',
		items: [
			{
				label: 'Auth',
				icon: 'pi pi-fw pi-user',
				items: [
					{
						label: 'Login',
						icon: 'pi pi-fw pi-sign-in',
						to: '/auth/login',
					},
				],
			},
		],
	},
])
</script>

<template>
	<ul class="layout-menu">
		<template v-for="(item, i) in model" :key="item">
			<app-menu-item
				v-if="!item.separator"
				:item="item"
				:index="i"
			></app-menu-item>
			<li v-if="item.separator" class="menu-separator"></li>
		</template>
	</ul>
</template>

<style lang="scss" scoped></style>
