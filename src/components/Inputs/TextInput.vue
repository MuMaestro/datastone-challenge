<script setup lang="ts">
import { defineModel } from 'vue';

const [valueModel] = defineModel({
	required: true,
});
</script>
<template>
	<div class="input-wrapper">
		<span class="input-label">
			<slot></slot>
		</span>
		<input v-model="valueModel" v-bind="{...$attrs}" />
	</div>
</template>
<style scoped>
.input-wrapper {
	@apply flex flex-col relative font-sans text-matisse-800
}
.input-wrapper:focus-within .input-label {
	@apply text-matisse-950
}
.input-wrapper input {
	all: unset;
	@apply bg-matisse-100 border-solid border-2 border-transparent rounded  p-2 transition-all
}
.input-wrapper input:focus-within {
	@apply bg-matisse-200 border-matisse-950
}
</style>