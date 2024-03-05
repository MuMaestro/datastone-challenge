<script setup lang="ts">
const { iconMode } = defineProps({
	iconMode: { type: Boolean, default: false }
})
</script>
<template>
	<button class="button" :class="{ iconMode }">
		<slot>aaa</slot>
	</button>
</template>
<style scoped>
.button {
	all: unset;
	@apply px-3 py-2 flex items-center justify-center gap-2 rounded overflow-hidden bg-matisse-50 text-matisse-850 hover:bg-matisse-200 hover:text-matisse-900
}
.button.iconMode {
	@apply p-3 rounded-full
}

</style>