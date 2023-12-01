import { defineStore } from 'pinia'

export const useDarkModeStore = defineStore({
  id: 'darkMode',
  state: () => ({
    isDarkMode: false
  }),
  getters: {
    getDarkMode(state) {
      return state.isDarkMode
    }
  },
  actions: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode
      document.documentElement.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light')
    },
    setDarkMode(isDarkMode) {
      this.isDarkMode = isDarkMode
      document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light')
    }
  }
})
