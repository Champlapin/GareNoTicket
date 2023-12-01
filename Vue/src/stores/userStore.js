import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'

export const useAuthStore = defineStore({
  id: 'AuthStore',
  state: () => ({
    user: null
  }),
  getters: {
    getUser: (state) => state.user,
    isValet: (state) => state.user.isValet,
    isMoving: (state) => state.user.voiture.isMoving
  },
  mutations: {
    setState(state, newValue) {
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
      })
      console.log(res)

      if (!res.email) {
        //TODO : Ajouter les messages de retour de la BD.
        console.log('bad email')
      } else if (!res.password) {
        console.log('bad password')
      }
      const token = res.jwt
      localStorage.setItem('jwt', token)
      this.user = jwtDecode(token)
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
    },
    async update(user, voiture, context) {
      const updateUser_URL = `http://localhost:3000/user/${user.id}`
      const updateCar_URL = ``

      const user_res = await fetch(updateUser_URL, {
        method: 'PUT',
        body: JSON.stringify({
          username: user.username,
          email: user.email
        }),
        headers: {
          //TODO : Poser la question.
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
      console.log(user_res)

      if (this.user.voiture) {
        const car_res = await fetch(updateUser_URL, {
          method: 'PUT',
          body: JSON.stringify({
            plaque: voiture.plaque,
            marque: voiture.marque,
            modele: voiture.modele,
            couleur: voiture.couleur
          }),
          headers: {
            //TODO : Poser la question.
            'Content-type': 'application/json; charset=UTF-8'
          }
        })
        console.log(car_res)
      } else {
        const car_res = await fetch(updateUser_URL, {
          method: 'POST',
          body: JSON.stringify({
            username: user.username,
            email: user.email
          }),
          headers: {
            //TODO : Poser la question.
            'Content-type': 'application/json; charset=UTF-8'
          }
        })
        console.log(car_res)
      }
    }
  }
})
