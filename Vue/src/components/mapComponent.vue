<script setup>

import L from 'leaflet';
import { onMounted } from 'vue';
import { useAuthStore } from '../stores/userStore'
import {useCarStore} from '../stores/carStore'

</script>

<script>
export default {
   
    data() {
        return {
            map: null,
            userVoiture: null,
            voitures: null,
        };
    },

    created() {

    },
    mounted() {
        
        this.map = L.map('map').setView([46.7922, -71.2639], 15);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 20,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            accessToken: 'pk.eyJ1IjoiY2hhbXByZW1peDQiLCJhIjoiY2pkcWlnYmV4MXo0MzMzbDdtdnMyOWdjMSJ9.rPqi3578_IEmJ7qdD46iDw'
        }).addTo(this.map);

        let marker = L.marker([46.7922, -71.2639]).addTo(this.map);

        
    },
}

</script>

<template>
    <div id="map" class=" h-[320px] z-[1] rounded-t-lg">
    </div>
</template>
