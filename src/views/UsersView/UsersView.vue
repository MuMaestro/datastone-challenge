<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import CreateOrUpdateUserDialogTrigger from './components/CreateOrUpdateUserDialogTrigger.vue';
import UserTableItem from './components/UserTableItem.vue';
const userStore = useUserStore();
console.log(userStore.usersList);
</script>

<template>
	<main>
		<div class="fixed inset-0 w-full h-full flex flex-col items-center justify-center py-8 bg-gray-50">
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
				<div class="flex flex-col gap-1">
					<UserTableItem v-for="user in userStore.usersList" :key="user.email" :user="user" />
				</div>
			</div>
			<!-- <BasicButton icon-mode>
				<GoogleIcon>
					search
				</GoogleIcon>
			</BasicButton>
			<BasicDialog>
				<template v-slot:default>
					<span>Alguma coisa</span>
				</template>
				<template v-slot:content>
					conteudo complexo
				</template>
			</BasicDialog>
			<div>parent bound v-model is: {{ value }}</div>
			<TextInput aria-label="name" v-model="value" >
				Nome
			</TextInput>
			<TextInput aria-label="email"  v-model="value"   >
				Email
			</TextInput>
			<TextInput aria-label="cpf"  v-model="value"   >
				Documento
			</TextInput>
			<TextInput aria-label="telefone"  v-model="value"   >
				Telefone
			</TextInput>
			<div>
				its: {{ ativo }}
			</div>
			<SwitchInput :id="'ativo'" v-model="ativo">
				Ativo
			</SwitchInput> -->
		</div>
	</main>
</template>
