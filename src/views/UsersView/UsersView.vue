<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import CreateOrUpdateUserDialogTrigger from './components/CreateOrUpdateUserDialogTrigger.vue';
import UserTableItem from './components/UserTableItem.vue';
const userStore = useUserStore();
console.log(userStore.usersList);
</script>

<template>
	<main>
		<div class="fixed w-full h-full flex flex-col items-center justify-center py-8 bg-gray-50">
			<div class="w-full max-w-[980px] h-full flex flex-col gap-8">
				<div class="w-full flex gap-4">
					<div class="w-full flex flex-col gap-1 px-6 py-4 rounded bg-matisse-100">
						<h1 class="text-5xl">Usuários</h1>
						<span class="text-xl font-extralight">Crie e altere usuários.</span>
					</div>
					<div class="flex flex-col gap-1 px-6 py-4 rounded bg-matisse-100">
						<CreateOrUpdateUserDialogTrigger />
					</div>
				</div>
				<div class="flex flex-col h-full overflow-auto scroll-smooth gap-1">
					<UserTableItem v-for="user in userStore.usersList" :key="user.email" :user="user" />
				</div>
			</div>
		</div>
	</main>
</template>
