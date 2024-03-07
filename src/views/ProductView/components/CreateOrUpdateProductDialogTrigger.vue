<script setup lang="ts">
import BasicButton from '@/components/Buttons/BasicButton.vue';
import BasicDialog from '@/components/Dialogs/BasicDialog.vue';
import GoogleIcon from '@/components/Icons/GoogleIcon.vue';
import SwitchInput from '@/components/Inputs/SwitchInput.vue';
import TextInput from '@/components/Inputs/TextInput.vue';
import { useProductsStore } from '@/stores/products';
import { faker } from '@faker-js/faker';
import { toTypedSchema } from '@vee-validate/zod';
import { v4 as uuid } from 'uuid';
import { useForm } from 'vee-validate';
import { watchEffect } from 'vue';
import { z } from 'zod';

const ProductSchema = z.object({
	id: z.string().uuid(),
	name: z.string({ required_error: 'Nome não pode estar vazio' }).min(3, { message: 'Minimo de 3 caracteres'}),
	active: z.boolean().optional(),
})

const productStore = useProductsStore();
const [productModel] = defineModel<Product>({
	default: {
		active: true,
		name: undefined,
	}
})
watchEffect(() => {
	if(!productModel.value.id) {
		productModel.value = {
			...productModel.value,
			id: uuid(),
		}
	}
})

const { handleSubmit, errors, defineField, isFieldDirty, values, setValues } = useForm({
	validationSchema: toTypedSchema(ProductSchema),
	initialValues: productModel.value,
})
const [active, activeAttrs] = defineField('active');
const [name, nameAttrs] = defineField('name');

const onSubmit = handleSubmit((values) => {
	productStore.upsertProduct(values)
	productModel.value = values
})

function handleGenerateRandomValues() {
	setValues({
		id: uuid(),
		active: faker.datatype.boolean(),
		name: faker.commerce.product(),
	})
}
</script>
<template>
	<BasicDialog>
		<slot>
			<BasicButton class="w-[max-content] !bg-matisse-700 !text-matisse-50">
				criar produto
			</BasicButton>
		</slot>
		<template v-slot:content>
			<BasicButton v-if="!productModel.name || !$slots.default" icon-mode class="absolute top-3 right-[60px]" :onclick="handleGenerateRandomValues">
				<GoogleIcon>casino</GoogleIcon>
			</BasicButton>
			<form :onsubmit="onSubmit" class="flex flex-col gap-4">
				<TextInput v-model="name" v-bind="nameAttrs">
					Nome
				</TextInput>
				<SwitchInput v-model="active" v-bind="activeAttrs">
					Ativo
				</SwitchInput>
				<div class="h-6">
					<div class="text-red-600 h-0 w-full overflow-hidden transition-all transition-duration-[300]" 
						:class="{ '!h-6': 
							Object
							.keys(errors)
							.filter((k) => isFieldDirty(k as keyof typeof errors))
							.map((k) => errors[k as keyof typeof errors])?.[0] }"
						>
						* {{
							Object
							.keys(errors)
							.filter((k) => isFieldDirty(k as keyof typeof errors))
							.map((k) => errors[k as keyof typeof errors])?.[0]
						}}
					</div>
				</div>
				<div class="flex justify-between">
					<BasicButton type="reset" class="!bg-red-300 !text-red-950"> cancelar </BasicButton>
					<BasicButton class="!bg-matisse-700 !text-matisse-50" :disabled="!ProductSchema.safeParse(values).success"> salvar </BasicButton>
				</div>
			</form>
		</template>
	</BasicDialog>
</template>