<template>
	<ul class="list-none p-3 m-0">
		<li>
			<div
				class="p-3 flex align-items-center justify-content-between text-600 cursor-pointer p-ripple"
				data-pd-ripple="true"
				data-pd-styleclass="true"
			>
				<span class="font-medium">FAVORITES</span>
				<i class="pi pi-chevron-down"></i>
				<!-- TODO: тут функционал открытия и закрытия сделать -->
			</div>
			<ul class="list-none p-0 m-0 overflow-hidden">
				<li>
					<a
						class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
						data-pd-ripple="true"
					>
						<i class="pi pi-home mr-2"></i>
						<span class="font-medium">Dashboard</span>
						<span
							role="presentation"
							aria-hidden="true"
							data-p-ink="true"
							data-p-ink-active="false"
							class="p-ink"
							data-pc-name="ripple"
							data-pc-section="root"
						></span>
					</a>
				</li>
				<li>
					<a
						class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
						data-pd-ripple="true"
					>
						<i class="pi pi-bookmark mr-2"></i>
						<span class="font-medium">Bookmarks</span>
						<span
							role="presentation"
							aria-hidden="true"
							data-p-ink="true"
							data-p-ink-active="false"
							class="p-ink"
							data-pc-name="ripple"
							data-pc-section="root"
						></span>
					</a>
				</li>
			</ul>
		</li>
	</ul>
</template>

<script setup></script>

<style lang="scss" scoped></style>
