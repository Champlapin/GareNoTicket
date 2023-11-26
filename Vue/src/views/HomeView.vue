<script setup>
import MapComponent from '../components/mapComponent.vue';
import locationIcon from '../components/icons/locationIcon.vue'
</script>

<template>
  <div>
    <div class="my-4">
      <div class=" container mx-auto">
        <div class=" border-text border rounded-lg w-6/12 mx-auto border-opacity-20 shadow-sm">
          <MapComponent />
          <div class="py-4 flex justify-center">
            <button class="border border-text border-opacity-5 shadow-sm mx-4 p-1 rounded">Garer <span
                class="text-bold">(Icone)</span></button>
            <button class="border border-text border-opacity-5 shadow-sm mx-4 p-1 rounded">Récuperer <span
                class="text-bold">(Icone)</span></button>
            <button>
              <locationIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
