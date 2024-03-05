import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const STORE_NAME = 'products'
type StoreState = Record<string, Product>;

function useLocalStorage(): StoreState {
	return JSON.parse(localStorage.getItem(STORE_NAME) ?? 'undefined')
}
useLocalStorage.save = (val: StoreState) => { localStorage.setItem(STORE_NAME, JSON.stringify(val)); return val };

export const useCounterStore = defineStore(STORE_NAME, () => {

	const products = ref<StoreState>(useLocalStorage())
	const productsList = computed(() => Object.keys(products.value).map((k) => products.value[k]))
	const _ = computed(() => useLocalStorage.save(products.value))
	function upsertProduct(product: Product) {
		return products.value[product.name] = product;
	}
	function deleteProduct(product: Product) {
		delete products.value[product.name]
		return product;
	}
	return {
		products, productsList, upsertProduct, deleteProduct
	}
});
