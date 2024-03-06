<script setup lang="ts">
import ComboBox from '@/components/Inputs/ComboBox/ComboBox.vue';
import { useProductsStore } from '@/stores/products';
import { useUserProductsStore } from '@/stores/user-products';
import { compact } from 'lodash';
import { computed, onUpdated, ref, watchEffect } from 'vue';

const { user } = defineProps<{
	user: User
}>();
const productStore = useProductsStore();
const relationStore = useUserProductsStore();
const userRelations = computed(() => relationStore.ofUser(user.email));
const productOptions = computed(() => {
	return productStore.productsList
	.filter(p => p.active || userRelations.value.includes(p.name))
	.map(p => p.name);
})
const selectedRelations = ref<string[]>(userRelations.value);
const selectedRelationsPlaceholder = computed(() => selectedRelations.value.reduce((a, s) => !a ? s : `${a}, ${s}`, ''))
const open = ref(false);
relationStore.$onAction(({
	store,
	after
}) => {
	after(() => {
		selectedRelations.value = store.ofUser(user.email)
	})
})
watchEffect(() => {
	if(open.value) {
		selectedRelations.value.forEach(v => {
			relationStore.upsertRelation({ userEmail: user.email, productName: v });
		})
		userRelations.value.forEach(v => {
			if(!selectedRelations.value.includes(v)) {
				relationStore.deleteRelation({ userEmail: user.email, productName: v })
			}
		})
	} 
})
</script>
<template>
	<div class="flex flex-col gap-2">
		<span class="font-sans text-matisse-800 ">Produtos</span>
		<ComboBox v-model:open="open" :placeholder="selectedRelationsPlaceholder" multiple v-model="selectedRelations" :items="productOptions"></ComboBox>
	</div>
</template>