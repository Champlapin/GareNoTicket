<script setup>
import MapComponent from '../components/mapComponent.vue';
import locationIcon from '../components/icons/locationIcon.vue'
import { useAuthStore } from '../stores/userStore'
import { useCarStore } from '../stores/carStore';
import CarIcon from '../components/icons/CarIcon.vue';
import CarGoIcon from '../components/icons/CarGoIcon.vue';
import ParkingIcon from '../components/icons/ParkingIcon.vue';
import { RouterLink } from 'vue-router'

</script>

<script>
export default {
  data() {
    return {
    };
  },
  created() {
    this.$userStore = useAuthStore();
    this.$carStore = useCarStore();
  },

  components: { ParkingIcon }
}

</script>


<template>
  <div>
    <div class="my-4">
      <div class=" container mx-auto">
        <div class=" border-text border rounded-lg w-6/12 mx-auto border-opacity-20 shadow-sm">
          <MapComponent  />
          <div v-if="$carStore.getCar" class="py-4 flex justify-center">
            <button
              class="flex fill-primary hover:fill-background border border-primary shadow-primary p-1 hover:bg-primary hover:text-background transition-all active:bg-accent active:border-accent shadow-sm mx-4 rounded-sm">
              Garer
              <span class="text-bold fill-inherit">
                <ParkingIcon class=" fill-inherit" />
              </span>
            </button>
            <button
              class=" flex fill-primary hover:fill-background border border-primary shadow-primary p-1 hover:bg-primary hover:text-background transition-all active:bg-accent active:border-accent shadow-sm mx-4 rounded-sm">
              Récuperer
              <span class="text-bold ">
                <CarGoIcon class=" fill-inherit" />
              </span>
            </button>
            <button>
              <locationIcon class="fill-primary hover:fill-accent transition-all active:fill-secondary" />
            </button>
          </div>
          <div v-else class="text-center my-3">
            <p class="">Il semblerait que vous n'ayez pas de véhicule.</p>
            <p>
              <RouterLink class="border-b hover:text-accent hover:border-accent transition-all font-bold m-0 border-text "
                :to="{ name: 'profile' }">Ajouter in véhicule</RouterLink> à votre profile pour commencer.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div></template>
