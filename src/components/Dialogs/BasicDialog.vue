<script setup lang="ts">
import {
	DialogClose,
	DialogContent,
	DialogOverlay,
	DialogPortal,
	DialogRoot,
	DialogTrigger
} from 'radix-vue';
import BasicButton from '../Buttons/BasicButton.vue';
import GoogleIcon from '../Icons/GoogleIcon.vue';
</script>

<template>
	<DialogRoot>
		<DialogTrigger as-child>
			<slot >
				<BasicButton>
					<slot name="texto-trigger" />
				</BasicButton>
			</slot>
		</DialogTrigger>
		<DialogPortal>
			<DialogOverlay class="basic-dialog-overlay" />
			<DialogContent
				class="basic-dialog-content-wrapper"
				v-bind:class="$attrs.class"
			>
				<div class="basic-dialog-content-box">
					<slot name="content"/> 
					<DialogClose as-child>
						<slot name="close">
							<BasicButton icon-mode class="absolute top-3 right-3">
								<GoogleIcon>
									close
								</GoogleIcon>
							</BasicButton>
						</slot>
					</DialogClose>
				</div>
			</DialogContent>
		</DialogPortal>
	</DialogRoot>
</template>

<style scoped>
.basic-dialog-overlay {
	@apply bg-matisse-950/80 data-[state=open]:animate-overlayShow fixed inset-0 z-30
}
.basic-dialog-content-wrapper {
	@apply fixed z-[100] inset-0 flex items-center justify-center data-[state=open]:animate-contentShow focus:outline-none
}
.basic-dialog-content-box {
	@apply relative flex flex-col w-[90vw] max-w-[550px] rounded px-9 py-11 bg-matisse-50 shadow-matisse-950/30
}
</style>