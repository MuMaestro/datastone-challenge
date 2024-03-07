import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useStorage, type RemovableRef } from '@vueuse/core';

const STORE_NAME = 'products'
type StoreState = Record<string, Product>;

export const useProductsStore = defineStore(STORE_NAME, () => {
	const products: RemovableRef<StoreState> = useStorage(STORE_NAME, {});
	const productsList = computed(() => Object.keys(products.value).map((k) => products.value[k]))
	function upsertProduct(product: Product) {
		return products.value[product.id] = product;
	}
	function deleteProduct(product: Product) {
		delete products.value[product.id]
		return product;
	}
	return {
		products, productsList, upsertProduct, deleteProduct
	}
});
