import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'
import { useCarStore } from './carStore'

export const useAuthStore = defineStore({
  id: 'AuthStore',
  state: () => ({
    user: null
  }),
  getters: {
    getUser: (state) => state.user,
    isValet: (state) => {
      if (state.user) {
        return state.user.isValet
      }
      return false
    },
    isMoving: (state) => {
      if (!state.user) {
        return false
      }
      if (state.user.voiture) {
        return state.user.voiture.isMoving
      } else return false
    }
  },
  mutations: {
    setUser(state, newValue) {
      state.user = newValue
    }
  },
  actions: {
    async login(email, password) {
      const login_URL = 'http://localhost:3000/auth/login'

      const res = await fetch(login_URL, {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          password: password
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }).then((results) => {
        return results.json()
      })

      if (!res.email) {
        //TODO : Ajouter les messages de retour de la BD.
        console.log('bad email')
      } else if (!res.password) {
        console.log('bad password')
      }
      const token = res.jwt
      localStorage.setItem('jwt', token)

      const $carStore = useCarStore()
      console.log(token)
      const jwt = jwtDecode(token)
      this.user = jwt.user
      console.log(jwt)
      $carStore.currentCar = jwt.user.voiture
      return true
    },
    async signup(email, username, password, confirmPassword) {
      const signup_URL = 'http://localhost:3000/auth/signup'

      const res = await fetch(signup_URL, {
        method: 'POST',
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
          confirmPassword: confirmPassword
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })

      if (res.username) {
        return true
      }
      return false
    },
    async update(user) {
      const updateUser_URL = `http://localhost:3000/user/${user.id}`
      console.log('in the update')
      const res = await fetch(updateUser_URL, {
        method: 'PUT',
        body: JSON.stringify({
          username: user.username,
          email: user.email
        }),
        headers: {
          //TODO : Poser la question.
          'Content-type': 'application/json; charset=UTF-8',
          'Access-Control-Allow-Origin': '*'
        }
      })
      if (res.status == 200) {
        const token = await res.json()
        localStorage.setItem("jwt", token)
        const decoded = jwtDecode(token)
        const newUser = decoded.user

        this.user = {
          email: newUser.email,
          id: newUser.id,
          isValet: newUser.isValet,
          username: newUser.username
        }
      }
      return res
    }
  }
})
