import { useStorage, type RemovableRef } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed } from 'vue';

const STORE_NAME = 'user-products'
type StoreState = UserProductRelation[];

function relationsOfUser(relations: StoreState, email: string) {
	return relations.filter(({ userEmail }) => email === userEmail);
}
function relationsOfProduct(relations: StoreState, name: string) {
	return relations.filter(({ productName }) => name === productName);
}

export const useUserProductsStore = defineStore(STORE_NAME, () => {
	const relations: RemovableRef<StoreState> = useStorage(STORE_NAME, [])
	const ofUser = computed(() => (email: string) => relationsOfUser(relations.value, email).map(({ productName }) => productName))
	const ofProduct = computed(() => (name: string) => relationsOfProduct(relations.value, name).map(({ userEmail }) => userEmail))
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
	function deleteAllRelationsOfUser(email: string) {
		const allRelationsOf = relationsOfUser(relations.value, email).map(({ productName }) => productName)
		allRelationsOf.forEach((p) => deleteRelation({ productName: p, userEmail: email}))
	}
	return {
		relations, ofUser, ofProduct, upsertRelation, deleteRelation, deleteAllRelationsOfUser
	}
});

