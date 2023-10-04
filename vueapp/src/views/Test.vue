<template>
	<div class="grid">
		<div class="col-12 md:col-6 lg:col-3">
			<div class="text-center p-3 border-round-sm">
				<Card class="overflow-hidden shadow-5">
					<template #header>
						<img
							class="w-10"
							alt="user header"
							src="https://sun9-40.userapi.com/impg/O2ZNCFS2Ji22T8UAIiwVNaQUBlzzn5ZUiTOHOg/-gL4D_wmOD8.jpg?size=1000x958&quality=96&sign=9ae2d099121927b642db4eca19bb72c5&type=album"
						/>
					</template>
					<template #title>
						<div
							class="flex align-items-center justify-content-between mt-3 mb-2"
						>
							<span
								class="text-900 font-medium text-2xl font-bold text-gray-700"
								>Advanced Card</span
							>
							<span class="text-900 text-xl ml-3">$14</span>
						</div>
					</template>
					<template #content>
						<div class="flex align-items-center justify-content-between">
							<Button
								raised
								rounded
								severity="success"
								icon="pi pi-shopping-bag"
								label="Buy now"
							/>
							<Button
								icon="pi pi-heart"
								severity="warning"
								text
								raised
								rounded
								aria-label="Favorite"
							/>
						</div>
					</template>
				</Card>
			</div>
		</div>
		<div class="col-12 md:col-6 lg:col-3">
			<div class="text-center p-3 border-round-sm">
				<Card class="overflow-hidden shadow-5">
					<template #header>
						<img
							class="w-10"
							alt="user header"
							src="https://sun9-40.userapi.com/impg/O2ZNCFS2Ji22T8UAIiwVNaQUBlzzn5ZUiTOHOg/-gL4D_wmOD8.jpg?size=1000x958&quality=96&sign=9ae2d099121927b642db4eca19bb72c5&type=album"
						/>
					</template>
					<template #title>
						<div
							class="flex align-items-center justify-content-between mt-3 mb-2"
						>
							<span
								class="text-900 font-medium text-2xl font-bold text-gray-700"
								>Advanced Cardasdasdasdasd asdasd asd</span
							>
							<span class="text-900 text-xl ml-3">$14</span>
						</div>
					</template>
					<template #content>
						<div class="flex align-items-center justify-content-between">
							<Button
								raised
								rounded
								severity="success"
								icon="pi pi-shopping-bag"
								label="Buy now"
							/>
							<Button
								icon="pi pi-heart"
								severity="warning"
								text
								raised
								rounded
								aria-label="Favorite"
							/>
						</div>
					</template>
				</Card>
			</div>
		</div>
	</div>
</template>

<script setup>
import Button from 'primevue/button'
import Card from 'primevue/card'
</script>

<style lang="scss" scoped></style>
