<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import CreateOrUpdateUserDialogTrigger from './components/CreateOrUpdateUserDialogTrigger.vue';
import UserTableItem from './components/UserTableItem.vue';
const userStore = useUserStore();
</script>

<template>
	<main class="w-full h-full overflow-hidden">
		<div class="sm:fixed w-full max-h-full h-full flex flex-col sm:items-center justify-start sm:justify-center py-3 sm:py-8 px-3 sm:px-0 bg-gray-50">
			<div class="w-full max-w-[980px] h-full flex flex-col gap-3 sm:gap-8">
				<div class="w-full flex flex-col sm:flex-row gap-2 sm:gap-4">
					<div class="w-full flex flex-col gap-1 px-6 py-4 rounded bg-matisse-100">
						<h1 class="text-5xl">Usuários</h1>
						<span class="text-xl font-extralight">Crie e altere usuários.</span>
					</div>
					<div class="flex flex-col gap-1 px-6 py-4 rounded bg-matisse-100">
						<CreateOrUpdateUserDialogTrigger />
					</div>
				</div>
				<div class="flex flex-col h-full overflow-auto scroll-smooth gap-2 sm:gap-1">
					<UserTableItem v-for="user in userStore.usersList" :key="user.id" :user="user" />
				</div>
			</div>
		</div>
	</main>
</template>
