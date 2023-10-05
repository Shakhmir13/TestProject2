<script setup>
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Sidebar from 'primevue/sidebar'
import { ref } from 'vue'

import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'
const authStore = useAuthStore()

const hasToken = computed(() => authStore.authUser.token)

const checkUser = () => {
	const tokens = JSON.parse(localStorage.getItem('userTokens'))
	if (tokens) {
		authStore.authUser.token = tokens.token
		authStore.authUser.refreshToken = tokens.refreshToken
	}
}

checkUser()

const visible = ref(false)
</script>

<template>
	<div class="min-h-screen flex relative lg:static surface-ground">
		<!--SideBar-->
		<Sidebar v-model:visible="visible" class="flex flex-column h-full">
			<h2>Menu</h2>
			<router-link
				to="/"
				class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
				><i class="pi pi-home mr-2"></i>
				<span class="font-medium">Home</span>
			</router-link>
			<router-link
				to="/test"
				class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
				><i class="pi pi-bookmark mr-2"></i>
				<span class="font-medium">Test</span>
			</router-link>
			<router-link
				to="/signin"
				@click.prevent="authStore.logout"
				class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
				><i class="pi pi-sign-out mr-2"></i>
				<span class="font-medium">Logout</span>
			</router-link>
		</Sidebar>

		<!--MainBar-->
		<div class="min-h-screen flex flex-column relative flex-auto">
			<div
				v-if="hasToken"
				class="flex justify-content-start align-items-center surface-0 border-bottom-1 surface-border relative lg:static"
				style="height: 60px"
			>
				<Button
					size="large"
					text
					rounded
					icon="pi pi-bars"
					@click="visible = true"
				/>
				<span class="p-input-icon-left">
					<i class="pi pi-search" />
					<InputText v-model="value1" placeholder="Search" />
				</span>
			</div>
			<div class="p-5 flex flex-column flex-auto">
				<!--низ-->
				<router-view />
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
