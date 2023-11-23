import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createStore } from 'vuex'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const store = createStore({
  state() {
    return {
      theme: 'light'
    }
  },
  mutations: {
    toggleTheme(state) {
      state = state === 'light' ? 'dark' : 'dark'
      console.log(state);
    }
  }
})

app.use(createPinia())
app.use(router)
app.use(store)

app.mount('#app')
