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
      userinfo: null,
      userId: null,
      valet: null
    }
  },
  created() {
    this.$userStore = useAuthStore();
    this.valet = this.$userStore.user

    this.$carStore = useCarStore();
    this.car = this.$carStore.currentCar

    this.$toast = useToast()
  },
  mounted() {
    this.userId = this.$route.params.userId
    console.log(this.userId)
    this.$carStore.setCar(this.userId).then(() => {
      this.MoveCar(true)
    })
  },
  unmounted() {
    this.$carStore.setMoveToFalse(this.userId)
  },
  methods: {
    setViewToCar() {
      this.$refs.map.showCar()
    },
    async MoveCar(isMoving) {
      const res = await this.$carStore.setParking(this.userId, isMoving, true)

      let action = isMoving ? "récuperé" : "garé";
      let successMessage = `La voiture a été ${action}.`;
      let errorMessage = "Une érreur s'est produite lors de la requête.";

      if (res.status == 200) {
        if (!isMoving) {
          this.$toast.info(successMessage, { position: 'top-right', duration: 5000, showProgressBar: true });
          console.log(this.$route.userId)
          this.$carStore.Facturer(this.valet.price, this.userId)
          this.$emit('update-data', 'Vue');
          this.$router.push({ name: 'valet' })
        }
      }
      else {
        this.$toast.error(errorMessage, { position: 'top-right', duration: 5000, showProgressBar: true });
      }
    },
  }
}

</script>


<template>
  <div>
  </div>
  <div>
    <div class="my-auto">
      <div class=" container mx-auto h-full">
        <div class="  border-text border rounded-lg w-9/12 mx-auto border-opacity-40 shadow-special shadow-md">
          <MapComponent ref="map" />
          <div class="py-4 flex justify-center">
            <button @click="MoveCar(false)" type="button" :disabled="!$carStore.isMoving"
              :class="[this.$carStore.isMoving ? 'btn-active' : 'btn-inactive']">
              Garer
              <span class="text-bold fill-inherit">
                <ParkingIcon class=" fill-inherit" />
              </span>
            </button>

            <button @click="setViewToCar" type="button" class="">
              <locationIcon class="icon" />
            </button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
