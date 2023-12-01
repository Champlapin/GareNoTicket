import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/userStore'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import ProfileView from '../views/ProfileView.vue'
import MoveView from '../views/MoveView.vue'
import ValetView from '../views/ValetView.vue'
import TransactionView from '../views/TransactionView.vue'
import { jwtDecode } from 'jwt-decode'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: true,
      }
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
      component: ProfileView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/valet',
      name: 'valet',
      component: ValetView,
      meta: {
        requiresAuth: true,
        requiresValet: true
      }
    },
    {
      path: '/deplacement',
      name: 'deplacement',
      component: MoveView,
      meta: {
        requiresAuth: true,
        requiresValet: true
      }
    },
    {
      path: '/transaction',
      name: 'transaction',
      component: TransactionView,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let store = useAuthStore()

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const token = localStorage.getItem('jwt')
    if (!token) {
      next({ name: 'login' })
    } else {
      const decoded = jwtDecode(token)
      store.$state.user = decoded.user
      console.log(decoded.user)
      const now = Date.now() / 1000
      if (decoded.exp < now) {
        localStorage.removeItem('jwt')
        next({ name: 'login' })
      }

      if (to.matched.some((record) => record.meta.requiresValet)) {
        if (store.$state.user.isValet) {
          next()
        } else {
          next({ name: 'home' })
        }
      } else {
        try {
          next()
        } catch (e) {
          localStorage.removeItem('jwt')
          next({ name: 'login' })   
        }
      }
    }
  } else {
    next()
  }
})

export default router
