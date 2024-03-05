import ProductView from '@/views/ProductView.vue'
import { UsersView } from '@/views/UsersView'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'usuarios',
			component: UsersView
		},
		{
			path: '/produtos',
			name: 'produtos',
			component: ProductView
		},
	]
})

export default router
