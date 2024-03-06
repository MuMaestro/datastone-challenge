<script setup lang="ts">
import BasicButton from '@/components/Buttons/BasicButton.vue';
import BasicDialog from '@/components/Dialogs/BasicDialog.vue';
import SwitchInput from '@/components/Inputs/SwitchInput.vue';
import TextInput from '@/components/Inputs/TextInput.vue';
import { useUserStore } from '@/stores/user';
import { toTypedSchema } from '@vee-validate/zod';
import { cnpj, cpf } from 'cpf-cnpj-validator';
import { isEqual, keys } from 'lodash';
import validator from 'validator';
import { useForm } from 'vee-validate';
import { z } from 'zod';
import { faker } from '@faker-js/faker';
import GoogleIcon from '@/components/Icons/GoogleIcon.vue';

const UserSchema = z.object({
	name: z.string({ required_error: 'Nome não pode estar vazio' }).min(3, { message: 'Minimo de 3 caracteres'}),
	email: z.string({ required_error: 'Email não pode estar vazio' }).email({ message: 'Email inválido'}),
	document: z.string().optional().refine((arg) => !arg || (cpf.isValid(arg) || cnpj.isValid(arg)), {
		message: 'Documento inválido (somente cpf ou cnpj)',
	}),
	telephone: z.string().optional().refine((arg) => !arg || validator.isMobilePhone(arg), {
		message: 'Número de telefone inválido',
	}),
	active: z.boolean().optional().default(false),
})
const userStore = useUserStore();



const [userModel] = defineModel<User>({
	default: {
		active: true,
		document: undefined,
		email: undefined,
		name: undefined,
		telephone: undefined,
	}
})

const { handleSubmit, errors, defineField, isFieldDirty, values, setValues } = useForm({
	validationSchema: toTypedSchema(UserSchema),
	initialValues: userModel.value,
})
const [active, activeAttrs] = defineField('active');
const [document, documentAttrs] = defineField('document');
const [email, emailAttrs] = defineField('email');
const [name, nameAttrs] = defineField('name');
const [telephone, telephoneAttrs] = defineField('telephone');

const onSubmit = handleSubmit((values) => {
	userStore.upsertUser(values)
	userModel.value = values
})

function handleGenerateRandomValues() {
	setValues({
		active: faker.datatype.boolean(),
		document: faker.datatype.boolean() ? cpf.generate(true) : cnpj.generate(true),
		email: faker.internet.email(),
		name: faker.person.firstName() + ' ' + faker.person.lastName(),
		telephone: faker.helpers.fromRegExp('554399[1-9]{7}'),
	})
}
</script>
<template>
	<BasicDialog>
		<slot>
			<BasicButton class="w-[max-content] !bg-matisse-700 !text-matisse-50">
				criar usuário
			</BasicButton>
		</slot>
		<template v-slot:content>
			<BasicButton v-if="!userModel.email || !$slots.default" icon-mode class="absolute top-3 right-[60px]" :onclick="handleGenerateRandomValues">
				<GoogleIcon>casino</GoogleIcon>
			</BasicButton>
			<form :onsubmit="onSubmit" class="flex flex-col gap-4">
				<TextInput v-model="name" v-bind="activeAttrs">
					Nome
				</TextInput>
				<TextInput v-model="email" v-bind="documentAttrs">
					Email
				</TextInput>
				<TextInput v-model="document" v-bind="emailAttrs">
					Documento
				</TextInput>
				<TextInput v-model="telephone" v-bind="nameAttrs">
					Telefone
				</TextInput>
				<SwitchInput v-model="active" v-bind="telephoneAttrs">
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
					<BasicButton class="!bg-matisse-700 !text-matisse-50" :disabled="!UserSchema.safeParse(values).success"> salvar </BasicButton>
				</div>
			</form>
		</template>
	</BasicDialog>
</template>