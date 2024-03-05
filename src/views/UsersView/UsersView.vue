<script setup lang="ts">
import { ref } from 'vue';
const value = ref('inicial')
const ativo = ref(true)
</script>

<template>
	<main>
		<div class="fixed inset-0 w-full h-full flex flex-col items-center justify-center">
			<div class="w-full max-w-[980px] h-full flex flex-col items-center">
				
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
