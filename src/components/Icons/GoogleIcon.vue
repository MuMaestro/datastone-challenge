<script setup lang="ts">
const { size, outlined } = defineProps({
	size: { type: Number, default: 24 },
	outlined: {type: Boolean, default: false },
})
</script>
<template>
	<i class="material-symbols-outlined" :class="{ outlined }" v-bind="{...$attrs}">
		<slot></slot>
	</i>
</template>
<style scoped>
.material-symbols-outlined {
	font-size: calc(v-bind(size) * 1px);
	font-variation-settings: 'FILL' 1, 'wght' 700, 'GRAD' 200, 'opsz' 48;
	@apply text-matisse-950 transition-all leading-none;
}
.material-symbols-outlined.outlined {
	font-variation-settings: 'FILL' 0, 'wght' 700, 'GRAD' 200, 'opsz' 48;
}
</style>