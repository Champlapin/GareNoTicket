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
    expose: ['showCarById', 'showCar'],

    data() {
        return {
            map: null,
            coords: null,
            markers: {},
        };
    },

    async created() {
        this.$userStore = useAuthStore()
        this.$carStore = useCarStore()
        this.$route = useRoute()
        this.coords = this.$carStore.getCoords
        //this.userslist = this.$carStore.getUsers()

    },
    async mounted() {
        let carStore = this.$carStore

        let View = {
            position: [46.7922, -71.2639],
            zoom: 15
            //Default map position set to the school.
        }

        if (this.$userStore.isValet) {
            const userslist = this.$carStore.userslist
            this.map = L.map('map').setView(View.position, View.zoom);

            console.log(userslist)
            if (userslist) {

                if (userslist.length > 0) {
                    const firstCar = userslist[0]
                    View.position = { lat: firstCar.latitude, lng: firstCar.longitude }

                    for (const user of userslist) {
                        L.marker({ lat: user.voiture.latitude, lng: user.voiture.longitude }).addTo(this.map);
                    }
                }
            }

        }
        else {

            if (!this.$carStore.getCar) {
                this.map = L.map('map').setView(View.position, View.zoom);
            }
            else {
                View.position = this.$carStore.getCoords;
                this.map = L.map('map').setView(View.position, View.zoom);
                console.log(this.coords)
                this.marker = L.marker(this.coords).addTo(this.map);

                if (!this.$carStore.isParked) {
                    this.marker.dragging.enable();
                }

                this.marker.on('dragend', function (e) {
                    const newCoords = e.target.getLatLng()
                    console.log(carStore)
                    carStore.coords = { lat: newCoords.lat, lng: newCoords.lng };
                })
            }
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
        showCar() {
            if (map) {
                const View = {
                    position: this.$carStore.getCoords,
                    zoom: 15
                }
                this.map.setView(View.position, View.zoom)
            }
        },
        showCarById(userId) {
            let watchedUser;
            for (const user of this.$carStore.userslist) {
                if (user._id === userId) {
                    watchedUser = user
                }
            }

            if (watchedUser) {
                const newcoords = { lat: watchedUser.voiture.latitude, lng: watchedUser.voiture.longitude }
                this.map.setView(newcoords)
            }

        },
        mountCars() {
            console.log("hello")
        }
    },
    computed: {
        isParked() {
            this.$carStore = useCarStore()
            if (this.$carStore) {
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
    <div id="map" class=" h-[480px] z-[1] rounded-t-lg">
    </div>
</template>
