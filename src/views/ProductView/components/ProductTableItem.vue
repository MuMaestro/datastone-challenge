<script setup lang="ts">
import BasicButton from '@/components/Buttons/BasicButton.vue';
import GoogleIcon from '@/components/Icons/GoogleIcon.vue';
import { useProductsStore } from '@/stores/products';
import { useUserProductsStore } from '@/stores/user-products';
import { ref } from 'vue';
import CreateOrUpdateProductDialogTrigger from './CreateOrUpdateProductDialogTrigger.vue';

const { product } = defineProps<{
	product: Product
}>();
const productMutable = ref(product);
const productStore = useProductsStore();
const relations = useUserProductsStore();
function handleDeleteProduct() {
	productStore.deleteProduct(product);
	relations.deleteAllRelationsOfProduct(product.id);
}
</script>
<template>
	<div class="product-table-item">
		<div class="flex flex-col gap-0.5 [grid-area:nome] sm:[grid-area:unset]">
			<span class="leading-none text-matisse-950 w-full truncate ">{{ product?.name.split(' ')?.[0] }}</span>
			<span class="leading-none text-matisse-400 text-sm w-full truncate">{{ product?.name.split(' ')?.slice(1).reduce((a, n) => `${a} ${n}`, '') }}</span>
		</div>
		<div class="flex flex-col gap-0.5 [grid-area:users] sm:[grid-area:unset]">
			<span class="leading-none text-matisse-950">{{ relations.ofProduct(product.id).length ?? 0 }}</span>
			<span class="leading-none text-matisse-400 text-sm">ususários relacionados</span>
		</div>
		<div class="flex gap-1 items-center [grid-area:status] sm:[grid-area:unset]">
			<div class="flex justify-center align-center p-1 rounded-full" :class="product.active ? 'bg-matisse-100' : 'bg-red-100'">
				<GoogleIcon :size="20" :outlined="product.active" :class="product.active?'!text-matisse-800':'!text-red-500'">{{ product.active ? 'lock_open' : 'lock'}}</GoogleIcon>
			</div>
			<span class="text-matisse-950 text-base">{{product.active ? 'Ativo' : 'Desativado '}}</span>

		</div>
		<div class="flex gap-2 justify-end [grid-area:acoes] sm:[grid-area:unset]">
			<CreateOrUpdateProductDialogTrigger v-model="productMutable">
				<BasicButton icon-mode class="!p-2 !bg-matisse-600" >
					<GoogleIcon outlined :size="20" class="!text-matisse-100">edit</GoogleIcon>
				</BasicButton>
			</CreateOrUpdateProductDialogTrigger>
			<BasicButton icon-mode class="!p-2 !bg-red-500" :onclick="handleDeleteProduct">
				<GoogleIcon :size="20" class="!text-red-50">delete</GoogleIcon>
			</BasicButton>
		</div>
	</div>
</template>
<style>
.product-table-item {
	grid-template: 
			"nome nome" 40px
			"users users" 40px
			"status acoes" 40px / 1fr 1fr;
	@apply 
		grid 
		sm:[grid-template:40px/160px_1fr_110px_88px]
		items-center justify-center gap-2 px-4 py-3 rounded bg-gray-100
}
</style>