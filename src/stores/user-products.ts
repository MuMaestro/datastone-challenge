import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const STORE_NAME = 'user-products'
type StoreState = UserProductRelation[];

function useLocalStorage(): StoreState {
	return JSON.parse(localStorage.getItem(STORE_NAME) ?? 'undefined')
}
useLocalStorage.save = (val: StoreState) => { localStorage.setItem(STORE_NAME, JSON.stringify(val)); return val };

function relationsOfUser(relations: StoreState, email: string) {
	return relations.filter(({ userEmail }) => email === userEmail);
}
function relationsOfProduct(relations: StoreState, name: string) {
	return relations.filter(({ productName }) => name === productName);
}

export const useCounterStore = defineStore(STORE_NAME, () => {
	const relations = ref<StoreState>(useLocalStorage())
	const ofUser = computed(() => (email: string) => relationsOfUser(relations.value, email).map(({ productName }) => productName))
	const ofProduct = computed(() => (name: string) => relationsOfProduct(relations.value, name).map(({ userEmail }) => userEmail))
	const _ = computed(() => useLocalStorage.save(relations.value))
	function upsertRelation(relation: UserProductRelation) {
		const { userEmail, productName } = relation;
		if (relations.value.find(r => r.userEmail === userEmail && r.productName === productName)) {
			return relation;
		}
		relations.value.push(relation);
		return relation; 
	}
	function deleteRelation(relation: UserProductRelation) {
		relations.value = relations.value.filter((r) => !(r.productName === relation.productName && r.userEmail === relation.userEmail))
		return relation;
	}
	return {
		relations, ofUser, ofProduct, upsertRelation, deleteRelation	
	}
});

