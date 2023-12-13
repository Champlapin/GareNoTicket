import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'
import { useCarStore } from './carStore'
import API_URL from '../config'

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
      const login_URL = `${API_URL}/auth/login`
      console.log(login_URL)

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
      } else {
        const token = res.jwt
        localStorage.setItem('jwt', token)

        const $carStore = useCarStore()
        console.log(token)
        const jwt = jwtDecode(token)
        this.user = jwt.user
        console.log(jwt)
        $carStore.currentCar = jwt.user.voiture
        return { valide: true }
      }
    },
    async signup(email, username, password, confirmPassword) {
      const signup_URL = `${API_URL}/auth/signup`

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
      }).then((results) => {
        return results.json()
      })

      if (res.emailUnique) {
        return { emailUnique: res.emailUnique }
      } else if (res.passwordMatch) {
        return { passwordMatch: res.passwordMatch }
      } else {
        return { valide: true }
      }
    },
    async update(user) {
      const updateUser_URL = `${API_URL}/user/${user.id}`
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
        localStorage.setItem('jwt', token)
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
    },
    async getFacture() {
      const URL = `${API_URL}/facture`
      let results = await fetch(URL, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
          Authorization: localStorage.getItem('jwt')
        }
      }).then((res) => {
        if (res.status === 200) {
          return res.json().then((factures) => {
            return factures
          })
        } else {
          return false
        }
      })

      return results
    },
    async getHistos() {
      const URL = `${API_URL}/historique`
      let results = await fetch(URL, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
          Authorization: localStorage.getItem('jwt')
        }
      }).then((res) => {
        if (res.status === 200) {
          return res.json().then((histos) => {
            return histos
          })
        } else {
          return false
        }
      })

      return results
    },
    async payerFacture() {
      const URL = `${API_URL}/effectuerPaiement`
      let factures = await fetch(URL, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
          Authorization: localStorage.getItem('jwt')
        }
      }).then((res) => {
        return res.json()
      })
      //TODO : Retourner la nouvelle facture et les nouveaux histos
      return factures
    },
    LogoutUser() {
      localStorage.clear()
      this.user = null
      const $carStore = useCarStore()
      $carStore.currentCar = null
    }
  }
})
