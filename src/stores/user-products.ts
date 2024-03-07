import { useStorage, type RemovableRef } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed } from 'vue';

const STORE_NAME = 'user-products'
type StoreState = UserProductRelation[];

function relationsOfUser(relations: StoreState, id: string) {
	return relations.filter(({ userId }) => id === userId);
}
function relationsOfProduct(relations: StoreState, id: string) {
	return relations.filter(({ productId }) => id === productId);
}

export const useUserProductsStore = defineStore(STORE_NAME, () => {
	const relations: RemovableRef<StoreState> = useStorage(STORE_NAME, [])
	const ofUser = computed(() => (id: string) => relationsOfUser(relations.value, id))
	const ofProduct = computed(() => (id: string) => relationsOfProduct(relations.value, id))
	function upsertRelation(relation: UserProductRelation) {
		const { userId, productId } = relation;
		if (relations.value.find(r => r.userId === userId && r.productId === productId)) {
			return relation;
		}
		relations.value.push(relation);
		return relation;
	}
	function deleteRelation(relation: UserProductRelation) {
		relations.value = relations.value.filter((r) => !(r.productId === relation.productId && r.userId === relation.userId))
		return relation;
	}
	function deleteAllRelationsOfUser(id: string) {
		const allRelationsOf = relationsOfUser(relations.value, id).map(({ productId }) => productId)
		allRelationsOf.forEach((p) => deleteRelation({ productId: p, userId: id}))
	}
	function deleteAllRelationsOfProduct(id: string) {
		const allRelationsOf = relationsOfProduct(relations.value, id).map(({ userId }) => userId)
		allRelationsOf.forEach((u) => deleteRelation({ productId: id, userId: u}))
	}
	return {
		relations, ofUser, ofProduct, upsertRelation, deleteRelation, deleteAllRelationsOfUser, deleteAllRelationsOfProduct
	}
});

