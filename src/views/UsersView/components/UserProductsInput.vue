<script setup lang="ts">
import ComboBox from '@/components/Inputs/ComboBox/ComboBox.vue';
import { useProductsStore } from '@/stores/products';
import { useUserProductsStore } from '@/stores/user-products';
import { compact } from 'lodash';
import { computed, onUpdated, ref, watchEffect } from 'vue';

function transformToComboboxOptions(relations: UserProductRelation[], products: Record<string, Product>): { key: string, value: string }[] {
	const validRelations = relations.filter(r => !!r.productId);
	const result = validRelations.map(r => ({ key: r.productId, value: products[r.productId].name }))
	return result;
}

const { user } = defineProps<{
	user: User
}>();
const productStore = useProductsStore();
const relationStore = useUserProductsStore();
const products = computed(() => productStore.products);
const userProductsRelations = computed(() => relationStore.ofUser(user.id));
const productsAvaliable = computed(() => {
	return productStore.productsList
		.filter(p => p.active || userProductsRelations.value.find((r) => r.productId === p.id))
		.map(p => ({ key: p.id, value: p.name }))
})
const selectedProducts = ref(transformToComboboxOptions(userProductsRelations.value, products.value));
const selectedProductsPlaceholder = computed(() => selectedProducts.value.reduce((a, s) => !a ? s.value : `${a}, ${s.value}`, ''))
const open = ref(false);
relationStore.$onAction(({
	store,
	after,
}) => {
	after(() => {
		selectedProducts.value = transformToComboboxOptions(store.ofUser(user.id), products.value)
	})
})
watchEffect(() => {
	if (open.value) {
		selectedProducts.value.forEach(v => {
			relationStore.upsertRelation({ userId: user.id, productId: v.key });
		})
		userProductsRelations.value.forEach(v => {
			if (!selectedProducts.value.find((r) => r.key === v.productId)) {
				relationStore.deleteRelation({ userId: user.id, productId: v.productId })
			}
		})
	}
})
</script>
<template>
	<div class="flex flex-col gap-2">
		<span class="font-sans text-matisse-800 ">Produtos</span>
		<ComboBox v-model:open="open" :placeholder="selectedProductsPlaceholder" multiple v-model="selectedProducts" :items="productsAvaliable"></ComboBox>
	</div>
</template>