<script setup lang="ts">
import BasicButton from '@/components/Buttons/BasicButton.vue';
import BasicDialog from '@/components/Dialogs/BasicDialog.vue';
import GoogleIcon from '@/components/Icons/GoogleIcon.vue';
import { useUserProductsStore } from '@/stores/user-products';
import { computed } from 'vue';
import UserProductsInput from './UserProductsInput.vue';
import { useProductsStore } from '@/stores/products';
import { faker } from '@faker-js/faker';

const {user} = defineProps<{
	user: User
}>();
const productStore = useProductsStore();
const relationStore = useUserProductsStore();
const userRelations = computed(() => relationStore.ofUser(user.id));
function deleteRelation(productId: string) {
	relationStore.deleteRelation({ productId, userId: user.id });
}
function handleGenerateRandomValues() {
	const selected = faker.helpers
		.arrayElements(
			productStore.productsList.filter(p => p.active), 
			faker.number.int({ max: productStore.productsList.length })
		)
	selected.forEach(p => relationStore.upsertRelation({ userId: user.id, productId: p.id }))
}
</script>
<template>
	<BasicDialog>
		<slot>
			<BasicButton class="w-[max-content] !bg-matisse-700 !text-matisse-50">
				editar relações
			</BasicButton>
		</slot>
		<template v-slot:content>
			<BasicButton icon-mode class="absolute top-3 right-[60px]" :onclick="handleGenerateRandomValues">
				<GoogleIcon>casino</GoogleIcon>
			</BasicButton>
			<div class="flex flex-col gap-4">
				<UserProductsInput :user="user" />
				<div class="grid grid-cols-[1fr] sm:grid-cols-[1fr_1fr] gap-3 min-h-[400px] max-h-[400px] w-full overflow-auto" style="grid-auto-rows: 56px;">
					<div v-for="relation in userRelations" :key="relation.productId" class="h-[56px] flex items-center justify-between gap-2 px-4 py-3 rounded justify-betweenbg-matisse-300 bg-matisse-200">
						<span class="text-matisse-950 font-bold" >{{ productStore.products[relation.productId].name }}</span> 
						<BasicButton icon-mode class="!p-2 !bg-red-500" :onclick="() => deleteRelation(relation.productId)">
							<GoogleIcon :size="16" class="!text-red-50">delete</GoogleIcon>
						</BasicButton>
					</div>
				</div>
			</div>
		</template>
	</BasicDialog>
</template>