<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HomeView from './views/HomeView.vue'
import navigationBar from './components/navigationBar.vue'
import FooterComponent from './components/FooterComponent.vue';
import { useDarkModeStore } from './stores/darkMode';
const darkModeStore = useDarkModeStore();

</script>

<script>
export default {

  data() {
    return {
      theme: 'light',
    }
  }
}
</script>

<template>
  <header>
    <navigationBar />
  </header>
  <main>
    <RouterView />
  </main>

  <FooterComponent />
</template>
