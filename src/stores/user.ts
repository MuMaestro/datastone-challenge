import { useStorage, type RemovableRef } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed } from 'vue';

const STORE_NAME = 'users'
type StoreState = Record<string, User>;

export const useUserStore = defineStore(STORE_NAME, () => {
	const users: RemovableRef<StoreState> = useStorage(STORE_NAME, {}); 
	const usersList = computed(() => Object.keys(users.value).map((k) => users.value[k]))
	function upsertUser(user: User) {
		users.value[user.email] = user;
		return user; 
	}
	function deleteUser(user: User) {
		delete users.value[user.email]
		return user;
	}
	return {
		users, usersList, upsertUser, deleteUser
	}
});
