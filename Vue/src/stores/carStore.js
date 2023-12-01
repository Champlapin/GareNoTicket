import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'

export const useCarStore = defineStore({
  id: 'AuthStore',
  state: () => ({
    currentCar: null,
    carList: null
  }),
  getters: {
    getCar: (state) => state.currentCar
  },
  mutations: {
    setState(state, newValue) {
      state.currentCar = newValue
    }
  },
  actions: {
    async login(email, password) {
      const login_URL = 'http://localhost:3000/auth/login'

      await fetch(login_URL, {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          password: password
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(!json.email)
          console.log(!json.password)

          if (!json.email) {
            //TODO : Ajouter les messages de retour de la BD.
            console.log(json.message)
          } else if (!json.password) {
            console.log(json.message)
          } else {
            localStorage.setItem('jwt', json.jwt)
            return true
          }
          console.log(json)
        })
      return false
    }
  }
})
