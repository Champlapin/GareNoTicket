<script setup>
import { RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/userStore';
import MainLogo from '../components/icons/mainLogo.vue'
import MainLogoV from '../components/icons/mainLogo(valet).vue'
import UserIcon from '../components/icons/userIcon.vue'

</script>

<script>

export default {
  data() {
    return {
      userDropdown: false
    }
  },
  created() {
    this.$userStore = useAuthStore()


  },
  methods: {
    toggleDropdown(hide = false) {
      //hide permet de cacher le dropdown peu importe

      this.userDropdown = hide ? false : !this.userDropdown;
    },

  },
  components: {
    MainLogo, UserIcon
  }

}

</script>

<template>
  <div class="bg-text py-3 bg-opacity-5 shadow-md" :class="[$userStore.isValet ? 'shadow-special' : '']">
    <nav class="container mx-auto flex justify-between">
      <div>
        <RouterLink v-if="!$userStore.isValet" :to="{ name: 'home' }">
          <MainLogo />
        </RouterLink>
        <RouterLink v-else :to="{ name: 'valet' }">
          <MainLogoV />
        </RouterLink>

      </div>
      <div v-if="!this.$userStore.user" class="flex">
        <RouterLink class="nav-link" :to="{ name: 'login' }">Se connecter</RouterLink>
        <RouterLink class="nav-link-2" :to="{ name: 'signup' }">Créer un ccompte</RouterLink>
      </div>
      <div v-else class="my-auto flex justify-between w-2/12">
        <RouterLink :to="{ name: 'profile' }" @click="toggleDropdown"
          class="transition-all flex bg-text bg-opacity-0 p-2 rounded-lg hover:bg-opacity-10 active:bg-opacity-20">
          <UserIcon class="my-auto" /> <span class="">{{ $userStore.user.username }}</span>
        </RouterLink>
        <div class=" text-center py-2 my-auto">
          <RouterLink class="transition-all bg-text bg-opacity-0 p-2 rounded-lg hover:bg-opacity-10 active:bg-opacity-20"
            :to="{ name: 'logout' }">Déconnecter</RouterLink>
        </div>

      </div>
    </nav>
  </div>
</template>