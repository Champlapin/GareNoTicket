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
        this.map = L.map('map');
        let View;

        //Bizarement asynchrone alors je l'ai désactivé.
        // if (navigator.geolocation) {
        //    navigator.geolocation.getCurrentPosition(position => {
        //        console.log("Latitude: " + position.coords.latitude);
        //         console.log("Longitude: " + position.coords.longitude);
        //         View.position = [position.coords.latitude, position.coords.longitude]
        //         View.zoom = 15
        //     });
        // }

        View = {
            position: [46.7922, -71.2639],
            zoom: 15
            //Default map position set to the school.
        }

        if (this.$route.name === 'valet') {
            this.$carStore.setUsers().then(() => {
                const userslist = this.$carStore.userslist

                console.log(userslist)
                if (userslist.length) {

                    if (userslist.length > 0) {
                        const shownCar = userslist[0].voiture
                        View.position = { lat: shownCar.latitude, lng: shownCar.longitude }
                        this.map.setView(View.position, View.zoom);

                        for (const user of userslist) {
                            L.marker({ lat: user.voiture.latitude, lng: user.voiture.longitude }).addTo(this.map);
                        }
                    }
                }
                else {
                    this.map.setView(View.position, View.zoom);
                }

                L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 20,
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                    accessToken: 'pk.eyJ1IjoiY2hhbXByZW1peDQiLCJhIjoiY2pkcWlnYmV4MXo0MzMzbDdtdnMyOWdjMSJ9.rPqi3578_IEmJ7qdD46iDw'
                }).addTo(this.map);
            })
        }
        else if (this.$route.name === 'deplacement') {

            const userId = this.$route.params.userId
            console.log(userId)
            this.$carStore.setCar(userId).then(() => {
                console.log(this.$carStore.currentCar)

                this.coords = this.$carStore.getCoords;
                this.map.setView(this.coords, View.zoom)
                this.marker = L.marker(this.coords).addTo(this.map);


                this.marker.dragging.enable();


                this.marker.on('dragend', function (e) {
                    const newCoords = e.target.getLatLng()
                    console.log(newCoords)
                    carStore.coords = { lat: newCoords.lat, lng: newCoords.lng };
                })

            })
        }
        else {

            if (!this.$carStore.getCar) {
                this.map.setView(View.position, View.zoom);
            }
            else {
                View.position = this.$carStore.getCoords;
                this.map.setView(View.position, View.zoom);
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

    },
    updated() {

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
        isMoving() {
            this.$carStore = useCarStore()
            if (this.$carStore) {
                return this.$carStore.isMoving
            }
            else {
                return null
            }
        }

    },
    watch: {
        isParked(newVal, oldVal) {
            if (this.$route.name == 'home') {

                if (this.marker) {
                    if (newVal) {
                        this.marker.dragging.disable()
                    }
                    else {
                        this.marker.dragging.enable()
                    }
                }
            }
        },
        isMoving(newVal, oldval) {
            if (this.$route.name == 'deplacement') {

                if (this.marker) {
                    if (!newVal) {
                        this.marker.dragging.disable()
                    }
                    else {
                        this.marker.dragging.enable()
                    }
                }
            }
        }
    }

}

</script>

<template>
    <div id="map" class=" h-[480px] z-[1] rounded-t-lg">
    </div>
</template>
