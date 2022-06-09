import { createRouter, createWebHistory } from 'vue-router'
import Chat from '../views/Chat.vue'
import Login from '../views/Login.vue'
import Error from '../views/Error.vue'

const routes = [
  {
    path: '/',
    name: 'chat',
    component: Chat,
    beforeEnter: (to, from, next) => {
      return localStorage.user ? next() : next('/login')
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'error',
    component: Error
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
