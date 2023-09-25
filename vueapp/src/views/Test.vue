<template>
	<div class="flex justify-content-center align-content-center flex-wrap pt-5">
		<div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
			<div class="text-center mb-5">
				<div class="text-900 text-3xl font-medium mb-3">Our test project</div>
				<span class="text-600 font-medium line-height-3"
					>Don't have an account?</span
				>
				<a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
					>Create today!</a
				>
			</div>

			<div>
				<label for="email1" class="block text-900 font-medium mb-2"
					>Email</label
				>
				<InputText
					id="email1"
					type="text"
					placeholder="Email address"
					class="w-full mb-3"
				/>

				<label for="password1" class="block text-900 font-medium mb-2"
					>Password</label
				>
				<InputText
					id="password1"
					type="password"
					placeholder="Password"
					class="w-full mb-3"
				/>

				<div class="flex align-items-end justify-content-end mb-6">
					<a
						class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
						>Forgot password?</a
					>
				</div>

				<Button label="Sign In" icon="pi pi-user" class="w-full"></Button>
			</div>
		</div>
	</div>
</template>

<script setup>
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
</script>

<style lang="scss" scoped></style>
