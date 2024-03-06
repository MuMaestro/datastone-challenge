<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
	<div class="bg-gray-50 fixed inset-0 flex flex-col">
		<header class="flex justify-center bg-gray-200 ">
			<nav class="w-full max-w-[980px] flex justify-center sm:justify-start gap-4 py-2">
				<RouterLink to="/" class="router-link">Usuários</RouterLink>
				<RouterLink to="/produtos" class="router-link">Produtos</RouterLink>
			</nav>
		</header>
		<RouterView />
	</div>
</template>

<style scoped>
.router-link {
	@apply overflow-hidden text-2xl rounded px-3 py-2 bg-gray-300 text-gray-500 transition-all
}
.router-link[aria-current="page"] {
	@apply bg-gray-500 text-gray-100
}
</style>
