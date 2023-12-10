import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/userStore'
import { useCarStore } from '../stores/carStore'
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
        requiresAuth: true
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
      path: '/deplacement/:userId',
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
  let $userStore = useAuthStore()
  let $carStore = useCarStore()

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    //TODO : faire un fetch à la bd pour resetter le token au rechargement.
    const token = localStorage.getItem('jwt')
    if (!token) {
      next({ name: 'login' })
    } else {
      const decoded = jwtDecode(token)
      $userStore.user = decoded.user
      $carStore.currentCar = decoded.voiture
      $carStore.coords = decoded.voiture
        ? { lat: decoded.voiture.latitude, lng: decoded.voiture.longitude }
        : null

      if (decoded.user.isValet) {
        $carStore.setUsers()
      } else {
        $carStore.userslist = null
      }

      const now = Date.now() / 1000
      if (decoded.exp < now) {
        localStorage.removeItem('jwt')
        next({ name: 'login' })
      }

      if (to.matched.some((record) => record.meta.requiresValet)) {
        if ($userStore.$state.user.isValet) {
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
