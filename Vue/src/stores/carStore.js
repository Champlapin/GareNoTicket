import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'
import { url } from '@vuelidate/validators'
import { useAuthStore } from './userStore'



export const useCarStore = defineStore({
  id: 'CarStore',
  state: () => ({
    currentCar: null
  }),
  getters: {
    getCar: (state) => state.currentCar
  },
  mutations: {
    setCar(state, newValue) {
      state.currentCar = newValue
    }
  },
  actions: {
    async update(userId, voiture) {
      const URL = `http://localhost:3000/car/${userId}`

      const res = await fetch(URL, {
        method: 'PUT',
        body: JSON.stringify({
          plaque: voiture.plaque,
          marque: voiture.marque,
          modele: voiture.modele,
          couleur: voiture.couleur
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Access-Control-Allow-Origin': '*'
        }
      })

      let token = await res.json()
      console.log(res.status)
      if (res.status == 200) {
        const decoded = jwtDecode(token)
        localStorage.setItem('jwt', token)

        this.currentCar = decoded.voiture
      }
      return { voiture }
    },
    async getUsers() {
      const URL = `http://localhost:3000/users/`

      const res = fetch(URL)

      return res.json()
    }
  }
})
