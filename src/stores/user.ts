import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const STORE_NAME = 'users'
type StoreState = Record<string, User>;

function useLocalStorage(): StoreState {
	return JSON.parse(localStorage.getItem(STORE_NAME) ?? 'undefined')
}
useLocalStorage.save = (val: StoreState) => { localStorage.setItem(STORE_NAME, JSON.stringify(val)); return val };

export const useCounterStore = defineStore(STORE_NAME, () => {

	const users = ref<StoreState>(useLocalStorage())
	const usersList = computed(() => Object.keys(users.value).map((k) => users.value[k]))
	const _ = computed(() => useLocalStorage.save(users.value))
	function upsertUser(user: User) {
		return users.value[user.email] = user;
	}
	function deleteUser(user: User) {
		delete users.value[user.email]
		return user;
	}
	return {
		users, usersList, upsertUser, deleteUser
	}
});
