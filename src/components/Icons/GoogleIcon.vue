<script setup lang="ts">
const { size } = defineProps({
	size: { type: Number, default: 16 }
})
</script>
<template>
	<i class="material-symbols-outlined" :class="{ [`font-[${size}px]`]: true }" v-bind="{...$attrs}">
		<slot></slot>
	</i>
</template>
<style scoped>
.material-symbols-outlined {
  font-variation-settings:
  'FILL' 1,
  'wght' 700,
  'GRAD' 200,
  'opsz' 48;
  @apply text-matisse-950
}
</style>