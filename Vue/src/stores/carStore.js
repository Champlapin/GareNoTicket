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
    getCar: (state) => state.currentCar,
    isParked: (state) => state.currentCar.isParked,
    getCoords: (state) => {
      return { lat: state.currentCar.latitude, lng: state.currentCar.longitude }
    },
    getTimeToleave: (state) => state.currentCar.timeToLeave
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
    calculerHeure() {
      let newTime = new Date()
      let today = new Date()
      const hour = today.getHours()
      let newHour = today.getHours()

      console.log(today)
      if (today.getDay() >= 1 && today.getDay() < 6) {
        if (today.getHours() < 12) {
          newHour = hour < 11 && hour > 9 ? hour + 1 : 13
          newHour = hour < 9 ? 10 : newHour
          newTime.setHours(newHour)
        } else {
          const conditionMidi = hour > 13 || (hour === 13 && today.getMinutes() > 30)
          if (hour < 16 && conditionMidi) {
            newTime.setHours(hour + 1)
          } else if (!conditionMidi) {
            newTime.setHours(14, 30)
          } else {
            newTime.setHours(10, 0)
            if (today.getDay() == 5) {
              //FIXME : Vérifier si elle fonctionne.
              newTime.setDate(today.getDate() + ((1 + 7 - today.getDay()) % 7))
            } else {
              newTime.setDate(today.getDate() + 1)
            }
          }
        }
      } else {
        //

        newTime.setDate(today.getDate() + ((1 + 7 - today.getDay()) % 7))
        newTime.setHours(10, 0)
      }
      console.log(newTime)
      return newTime
    },
    async setParking(userId, isParked) {
      const URL = `http://localhost:3000/car/${userId}`
      let timeToLeave = new Date()
      let body

      if (isParked) {
        timeToLeave = this.calculerHeure()
        body = {
          isParked: isParked,
          timeToLeave: timeToLeave
        }
      } else {
        body = { isParked: isParked }
      }

      const res = await fetch(URL, {
        method: 'PUT',
        body: JSON.stringify(body),
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
      return { status: res.status, message: token }
    },
    async getUsers() {
      const URL = `http://localhost:3000/users/`

      const res = fetch(URL)

      return res.json()
    }
  }
})
