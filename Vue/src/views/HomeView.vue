<script setup>
import MapComponent from '../components/mapComponent.vue';
import locationIcon from '../components/icons/locationIcon.vue'
import { useAuthStore } from '../stores/userStore'
import { useCarStore } from '../stores/carStore';
import CarGoIcon from '../components/icons/CarGoIcon.vue';
import ParkingIcon from '../components/icons/ParkingIcon.vue';
import { RouterLink } from 'vue-router'
import { useToast } from 'vue-toast-notification';

</script>

<script>
export default {
  data() {
    return {
      user: null,
    };
  },
  created() {
    this.$userStore = useAuthStore();
    this.user = this.$userStore.user

    this.$carStore = useCarStore();
    this.car = this.$carStore.currentCar

    this.$toast = useToast()
  },
  methods: {
    async setCarParkingStatus(isParking) {
      const res = await this.$carStore.setParking(this.$userStore.user.id, isParking)

      let action = isParking ? "garé" : "récuperé";
      let successMessage = `Vous avez ${action} votre voiture.`;
      let errorMessage = "Une érreur s'est produite lors de la requête.";

      if (res.status == 200) {
        this.$toast.success(successMessage, { position: 'top-right', duration: 5000, showProgressBar: true });
        if (!isParking) {
          this.$emit('update-data', 'Vue');
        }
      }
      else {
        this.$toast.error(errorMessage, { position: 'top-right', duration: 5000, showProgressBar: true });
      }
    },

    setViewToCar() {

    },
  },
  components: { ParkingIcon, MapComponent }
}

</script>


<template>
  <div>
    <div class="my-auto">
      <div class=" container mx-auto h-full">
        <div
          class=" border-text border rounded-lg lg:w-6/12 md:w-8/12 sm:w-10/12 w-11/12 mx-auto border-opacity-20 shadow-sm">
          <MapComponent />
          <div v-if="$carStore.getCar" class="py-4 flex justify-center">
            <button @click="setCarParkingStatus(true)" type="button" :disabled="$carStore.isParked"
              :class="[!this.$carStore.isParked ? 'btn-active' : 'btn-inactive']">
              Garer
              <span class="text-bold fill-inherit">
                <ParkingIcon class=" fill-inherit" />
              </span>
            </button>
            <button @click="setCarParkingStatus(false)" type="button" :disabled="!$carStore.isParked"
              :class="[this.$carStore.isParked ? 'btn-active' : 'btn-inactive']" class="">
              Récuperer
              <span class="text-bold ">
                <CarGoIcon class=" fill-inherit" />
              </span>
            </button>
            <button @click="setViewToCar" type="button" class="">
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
  </div>
</template>
