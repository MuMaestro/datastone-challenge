<script setup lang="ts">
import GoogleIcon from '@/components/Icons/GoogleIcon.vue';
import { ComboboxAnchor, ComboboxContent, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxItemIndicator, ComboboxLabel, ComboboxRoot, ComboboxSeparator, ComboboxTrigger, ComboboxViewport } from 'radix-vue'
import { ref } from 'vue';

const { placeholder, items } = defineProps<{
	placeholder?: string,
	items: string[]
}>()

// const value = ref<string[]>()
const [value] = defineModel<string[]>()

</script>

<template>
  <ComboboxRoot v-model="value" class="relative" v-bind="{...$attrs}">
    <ComboboxAnchor class="combobox-trigger">
      <ComboboxInput class="combobox-input" :placeholder="placeholder" />
      <ComboboxTrigger class="flex items-center">
        <GoogleIcon :size="20" class="!text-matisse-950">
			expand_more
		</GoogleIcon>
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxContent class="combobox-content">
      <ComboboxViewport class="p-2 max-h-[--radix-popper-available-height] max-w-[--radix-popper-available-width]">
		<ComboboxItem
			v-for="(option, index) in items" :key="index"
			class="group h-10 leading-none text-matisse-950 rounded flex items-center gap-2 px-3 py-2 relative select-none data-[disabled]:text-gray-600 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-matisse-700 data-[highlighted]:text-matisse-100"
			:value="option"
		>
			<span class="w-full">
				{{ option }}
			</span>
			<ComboboxItemIndicator
				class="flex items-center justify-center"
			>
				<GoogleIcon class="!text-matisse-950 group-hover:!text-matisse-100"> check </GoogleIcon>
			</ComboboxItemIndicator>
		</ComboboxItem>
      </ComboboxViewport>
    </ComboboxContent>
  </ComboboxRoot>
</template>
<style scoped>
.combobox-trigger {
	@apply flex items-center justify-between rounded p-2 gap-1 bg-matisse-100 text-matisse-950 hover:bg-matisse-200 data-[placeholder]:text-matisse-800 outline-none h-[44px]
}
.combobox-input {
	all: unset;
	@apply w-full !bg-transparent text-matisse-950 selection:bg-matisse-950 placeholder-matisse-800 font-sans outline-none transition-all
}
.combobox-content {
	@apply absolute z-10 w-full mt-2 bg-matisse-50 overflow-hidden rounded shadow-[0px_10px_38px_-10px] shadow-matisse-950/35
}
</style>