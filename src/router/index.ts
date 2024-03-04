import DefaultView from '@/views/DefaultView.vue'
import ProductView from '@/views/ProductView.vue'
import UsersView from '@/views/UsersView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: DefaultView
    },
    {
      path: '/',
      name: 'produtos',
      component: ProductView
    },
    {
      path: '/',
      name: 'usuarios',
      component: UsersView
    },
  ]
})

export default router
