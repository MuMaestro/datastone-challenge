<script setup lang="ts">
import BasicButton from '@/components/Buttons/BasicButton.vue';
import GoogleIcon from '@/components/Icons/GoogleIcon.vue';
import { useUserStore } from '@/stores/user';
import { useUserProductsStore } from '@/stores/user-products';
import { cnpj, cpf } from 'cpf-cnpj-validator';
import { computed, ref } from 'vue';
import CreateOrUpdateUserDialogTrigger from './CreateOrUpdateUserDialogTrigger.vue';

const { user } = defineProps<{
	user: User
}>();
const userMutable = ref(user);
const relations = useUserProductsStore();
const userStore = useUserStore();
const documentProcessed = computed(() => {
	return user.document ? cpf.isValid(user.document) ? cpf.format(user.document) : cnpj.format(user.document) : 'sem documento';
})
function handleDeleteUser() {
	userStore.deleteUser(user);
	relations.deleteAllRelationsOfUser(user.email);
}
</script>
<template>
	<div class="grid grid-cols-[160px_1fr_140px_120px_110px_88px] grid-rows-[40px] items-center justify-center gap-2 px-4 py-3 rounded bg-gray-100">
		<div class="flex flex-col gap-0.5">
			<span class="leading-none text-matisse-950 w-full truncate ">{{ user?.name.split(' ')?.[0] }}</span>
			<span class="leading-none text-matisse-400 text-sm w-full truncate">{{ user?.name.split(' ')?.slice(1).reduce((a, n) => `${a} ${n}`, '') }}</span>
		</div>
		<div class="w-full truncate">{{ user?.email }}</div>
		<div class="flex flex-col gap-0.5">
			<span class="leading-none text-matisse-950">{{ documentProcessed }}</span>
			<span class="leading-none text-matisse-400 text-sm">{{ user.document ? cpf.isValid(user.document) ? 'cpf' : 'cnpj' : '' }}</span>
		</div>
		<div class="flex flex-col gap-0.5">
			<span class="leading-none text-matisse-950">{{ relations.ofUser(user.email).length ?? 0 }}</span>
			<span class="leading-none text-matisse-400 text-sm">produtos</span>
		</div>
		<div class="flex gap-1 items-center">
			<div class="flex justify-center align-center p-1 rounded-full" :class="user.active ? 'bg-matisse-100' : 'bg-red-100'">
				<GoogleIcon :size="20" :outlined="user.active" :class="user.active?'!text-matisse-800':'!text-red-500'">{{ user.active ? 'lock_open' : 'lock'}}</GoogleIcon>
			</div>
			<span class="text-matisse-950 text-base">{{user.active ? 'Ativo' : 'Desativado '}}</span>

		</div>
		<div class="flex gap-2 justify-end">
			<CreateOrUpdateUserDialogTrigger v-model="userMutable">
				<BasicButton icon-mode class="!p-2 !bg-matisse-600" >
					<GoogleIcon outlined :size="20" class="!text-matisse-100">edit</GoogleIcon>
				</BasicButton>
			</CreateOrUpdateUserDialogTrigger>
			<BasicButton icon-mode class="!p-2 !bg-red-500" :onclick="handleDeleteUser">
				<GoogleIcon :size="20" class="!text-red-50">delete</GoogleIcon>
			</BasicButton>
		</div>
	</div>
</template>