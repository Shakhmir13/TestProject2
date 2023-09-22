<script setup>
import SideBarMain from '@/components/SideBarMain.vue'

import { ref } from 'vue'

const menu = ref()

const toggle = event => {
	menu.value.toggle(event)
}
</script>

<template>
	<div
		id="app-sidebar-1"
		class="surface-section h-screen lg:block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 surface-border select-none"
		style="width: 280px"
	>
		<div class="flex flex-column h-full">
			<div
				class="flex align-items-center px-5 flex-shrink-0"
				style="height: 60px"
			>
				<img
					src="https://blocks.primevue.org/images/blocks/logos/hyper-700.svg"
					alt="Logo"
					height="30"
				/>
			</div>
			<div class="overflow-y-auto">
				<!-- main sidebar -->
				<SideBarMain />
				<ul class="list-none p-3 m-0">
					Application part
				</ul>
			</div>
			<div class="mt-auto">footer sidebara</div>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
