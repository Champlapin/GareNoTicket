import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'
import { url } from '@vuelidate/validators'
import { useAuthStore } from './userStore'
import API_URL from '../config'
export const useCarStore = defineStore({
  id: 'CarStore',
  state: () => ({
    currentCar: null,
    coords: null,
    userslist: null
  }),
  getters: {
    getCar: (state) => state.currentCar,
    isParked: (state) => {
      return state.currentCar ? state.currentCar.isParked : false
    },
    isMoving: (state) => {
      return state.currentCar ? state.currentCar.isMoving : false
    },
    getCoords: (state) => {
      return state.currentCar
        ? { lat: state.currentCar.latitude, lng: state.currentCar.longitude }
        : null
    },
    getTimeToleave: (state) => {
      state.currentCar ? state.currentCar.timeToLeave : null
    },
    getUsers: (state) => state.userslist
  },
  mutations: {
    setCar(state, newValue) {
      state.currentCar = newValue
    },
    setCoords(state, newValues) {
      state.coords = newValues
    }
  },
  actions: {
    setUserById(userId) {
      if (this.userslist.length > 0) {
        for (const user of this.userslist) {
          if (user.id === userId) {
            this.currentCar = user.voiture
          }
        }
      }
      return null
    },
    async update(userId, voiture) {
      const URL = `${API_URL}/car/${userId}`

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

      //today.setHours(16, 0)

      const hour = today.getHours()
      console.log(hour)
      let newHour = today.getHours()

      if (today.getDay() >= 1 && today.getDay() < 6) {
        if (today.getHours() < 12) {
          newHour = hour < 11 && hour >= 9 ? hour + 1 : 14
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
              newTime.setDate(today.getDate() + ((1 + 7 - today.getDay()) % 7))
            } else {
              newTime.setDate(today.getDate() + 1)
            }
          }
        }
      } else {
        newTime.setDate(today.getDate() + ((1 + 7 - today.getDay()) % 7))
        newTime.setHours(10, 0)
      }
      console.log(newTime)
      return newTime
    },
    async setParking(userId, parkOrMove, isMove = false) {
      const URL = `${API_URL}/car/${userId}`
      let timeToLeave = this.calculerHeure()
      let body
      const userStore = useAuthStore()
      const valet = userStore.user
      console.log(isMove)

      if (isMove) {
        if (!parkOrMove) {
          body = {
            isMoving: parkOrMove,
            timeToLeave: timeToLeave,
            longitude: this.coords.lng,
            latitude: this.coords.lat,
            valet: null
          }
        } else {
          body = {
            isMoving: parkOrMove,
            valet: valet.id
          }
        }
        console.log(body)
      } else {
        if (parkOrMove) {
          body = {
            isParked: parkOrMove,
            timeToLeave: timeToLeave,
            longitude: this.coords.lng,
            latitude: this.coords.lat
          }
        } else {
          body = { isParked: parkOrMove }
        }
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
      if (res.status == 200) {
        if (!isMove) {
          localStorage.setItem('jwt', token)
          const decoded = jwtDecode(token)
          this.currentCar = decoded.voiture
        } else {
          const decoded = jwtDecode(token)
          console.log(decoded)
        }
      }
      return { status: res.status, message: token }
    },

    async Facturer(price, idUser) {
      const $userStore = useAuthStore()
      const valet = $userStore.user
      const URL = `${API_URL}/facturer`

      await fetch(URL, {
        method: 'POST',
        body: JSON.stringify({ price, idUser, idValet: valet.id }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
          Authorization: localStorage.getItem('jwt')
        }
      })
      this.currentCar.isMoving = false
    },
    async setMoveToFalse(userId) {
      const URL = `${API_URL}/car/${userId}`

      await fetch(URL, {
        method: 'PUT',
        body: JSON.stringify({ isMoving: false }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Access-Control-Allow-Origin': '*'
        }
      })
      this.currentCar.isMoving = false
    },

    async setUsers() {
      const URL = `${API_URL}/users/`

      const res = await fetch(URL, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
          Authorization: localStorage.getItem('jwt')
        }
      })
      let response = await res.json()
      this.userslist = response.users
    },
    async setCar(userId) {
      const URL = `${API_URL}/user/${userId}`

      const res = await fetch(URL)
      let response = await res.json()
      //TODO : Ajouter un meiileur indacteur de validité.
      if (response.username) {
        this.currentCar = response.voiture
      }
    }
  }
})
