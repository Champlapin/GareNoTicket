<script setup>

import L from 'leaflet';
import { onMounted } from 'vue';
import { useAuthStore } from '../stores/userStore'
import { useCarStore } from '../stores/carStore'
import { useRoute } from 'vue-router';
import { mapState } from 'pinia';


</script>

<script>
export default {

    data() {
        return {
            map: null,
            voitures: null,
            coords: null,
        };
    },

    created() {
        this.$userStore = useAuthStore()
        this.$carStore = useCarStore()
        this.$route = useRoute()
        this.coords = this.$carStore.getCoords

    },
    mounted() {
        //Default map position set to the school.
        let View = {
            position: [46.7922, -71.2639],
            zoom: 15
        }
        if (!this.$carStore.getCar) {
            this.map = L.map('map').setView(View.position, View.zoom);
        }
        else {
            View.position = this.$carStore.getCoords;
            this.map = L.map('map').setView(View.position, View.zoom);
            this.marker = L.marker(this.coords).addTo(this.map);


            if (!this.$carStore.isParked) {
                this.marker.dragging.enable();
            }

            this.marker.on('dragend', function (e) {
                const newCoords = e.target.getLatLng()
                this.coords = [newCoords.lat, newCoords.lng];
                console.log(this.coords)
            })
        }

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 20,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            accessToken: 'pk.eyJ1IjoiY2hhbXByZW1peDQiLCJhIjoiY2pkcWlnYmV4MXo0MzMzbDdtdnMyOWdjMSJ9.rPqi3578_IEmJ7qdD46iDw'
        }).addTo(this.map);

        if (this.$route.name == "home") {

            if (this.$carStore.isParked) {
                console.log("car is parked")
            }
        }
    },
    methods: {

    },
    computed: {
        isParked() {
            this.$carStore = useCarStore()
            if (this.$carStore) {
                console.log(this.$carStore.isParked)
                return this.$carStore.isParked
            }
            else {
                return null
            }
        },

    },
    watch: {
        isParked(newVal, oldVal) {
            if (newVal) {
                this.marker.dragging.disable()
            }
            else {
                this.marker.dragging.enable()
            }
        }
    }

}

</script>

<template>
    <div id="map" class=" h-[320px] z-[1] rounded-t-lg">
    </div>
</template>
