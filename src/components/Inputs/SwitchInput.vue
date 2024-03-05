<script setup lang="ts">
import { SwitchRoot, SwitchThumb } from 'radix-vue';

const { id } = defineProps({
  id: { type: String, required: true },
});

const [switchState] = defineModel<boolean>({
	required: true,
});
</script>

<template>
  <div class="switch-wrapper">
	<SwitchRoot
		v-bind:id="id"
		v-model:checked="switchState"
		class="switch-wrapper-root"
	>
		<SwitchThumb
			class="switch-wrapper-thumb"
		/>
	</SwitchRoot>
	<label class="leading-none select-none" v-bind:for="id">
		<slot></slot>
	</label>
  </div>
</template>

<style>
.switch-wrapper {
	@apply text-matisse-800 flex gap-2 items-center transition-all
}
.switch-wrapper .switch-wrapper-root {
	@apply w-[42px] h-[25px] data-[state=checked]:bg-matisse-950 bg-matisse-950/50 rounded-full outline-matisse-950 focus-within:outline focus-within:outline-matisse-950 flex relative cursor-default
}
.switch-wrapper .switch-wrapper-root .switch-wrapper-thumb {
	@apply block w-[21px] h-[21px] my-auto bg-matisse-50 shadow-sm rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]
}


</style>