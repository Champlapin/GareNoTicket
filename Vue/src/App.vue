<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HomeView from './views/HomeView.vue'
import navigationBar from './components/navigationBar.vue'
import FooterComponent from './components/FooterComponent.vue';
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

<template class="text-text">
  <header>
    <navigationBar />
  </header>
  <main>
    <RouterView />
  </main>

  <FooterComponent />
</template>
