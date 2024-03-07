<script setup lang="ts">
import { useProductsStore } from '@/stores/products';
import CreateOrUpdateProductDialogTrigger from './components/CreateOrUpdateProductDialogTrigger.vue';
import ProductTableItem from './components/ProductTableItem.vue';
const productStore = useProductsStore();
</script>

<template>
	<main class="w-full h-full overflow-hidden">
		<div class="sm:fixed w-full max-h-full h-full flex flex-col sm:items-center justify-start sm:justify-center py-3 sm:py-8 px-3 sm:px-0 bg-gray-50">
			<div class="w-full max-w-[980px] h-full flex flex-col gap-3 sm:gap-8">
				<div class="w-full flex flex-col sm:flex-row gap-2 sm:gap-4">
					<div class="w-full flex flex-col gap-1 px-6 py-4 rounded bg-matisse-100">
						<h1 class="text-5xl">Produtos</h1>
						<span class="text-xl font-extralight">Crie e altere produtos.</span>
					</div>
					<div class="flex flex-col gap-1 px-6 py-4 rounded bg-matisse-100">
						<CreateOrUpdateProductDialogTrigger />
					</div>
				</div>
				<div class="flex flex-col h-full overflow-auto scroll-smooth gap-2 sm:gap-1">
					<ProductTableItem v-for="product in productStore.productsList" :key="product.id" :product="product" />
				</div>
			</div>
		</div>
	</main>
</template>
