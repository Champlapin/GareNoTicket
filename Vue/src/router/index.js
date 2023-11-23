import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import ProfileView from '../views/ProfileView.vue'
import MoveView from '../views/MoveView.vue'
import ValetView from '../views/ValetView.vue'
import TransactionView from '../views/TransactionView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/valet',
      name: 'valet',
      component: ValetView
    },
    {
      path: '/deplacement',
      name: 'deplacement',
      component: MoveView
    },
    {
      path: '/transaction',
      name: 'transaction',
      component: TransactionView
    }
  ]
})

export default router
