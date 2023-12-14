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
  <div class="dark-theme">
    <header>
      <navigationBar />
    </header>
    <main class=" min-h-[80vh] my-8">
      <RouterView />
    </main>
    <FooterComponent />
  </div>
</template>
