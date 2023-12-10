<script setup>
import mapComponent from '../components/mapComponent.vue';
import locationIcon from '../components/icons/locationIcon.vue';
import LowerNav from '../components/LowerNav.vue';
import CarIcon from '../components/icons/CarIcon.vue';
import { useAuthStore } from '../stores/userStore'
import { useCarStore } from '../stores/carStore';
import timespan from 'jsonwebtoken/lib/timespan';

//TODO : Créer une distinction entre ce que le valet voit et l'utilisateur normale. Pour ça, on va utliser une bordure verte ou shadow vert.
</script>

<script>

export default {
    data() {
        return {
            selectedCar: null,
        }
    },
    created() {
        this.$carStore = useCarStore()

        this.userslist = this.$carStore.getUsers

    },
    methods: {
        setViewTo(userId) {
            //TODO : Set the view to the car selected.
        },
        showTimeLeft(time) {
            time = new Date(time)
            const timeleft = time - new Date()
            const seconds = Math.floor((timeleft / 1000) % 60);
            const minutes = Math.floor((timeleft / 1000 / 60) % 60);
            const hours = Math.floor((timeleft / (1000 * 60 * 60)) % 24);
            const days = Math.floor(timeleft / (1000 * 60 * 60 * 24));

            let message = "";

            if (days > 1) {
                message = `${days} j ${hours} h`
            }
            else if (hours > 1) {
                message = ` ${hours} h ${minutes}`
            }
            else if (minutes > 0) {
                message = ` ${minutes}`
            }
            else if (seconds > 0) {
                message = ` ${seconds}`
            }
            else {
                message = `Prêt`
            }
            return message
        },
        selectUser(userId) {
            this.selectedCar = userId
            console.log(this.selectedCar)
            console.log(this.$refs.map)
            try {
                this.$refs.map.showCarById(userId);
            } catch (error) {
                console.log(error)
            }

        }
    },
    components: { mapComponent, CarIcon }

}

</script>

<template>
    <div>
        <div class="my-4">
            <div class=" container mx-auto">
                <div class=" border-text border rounded-lg w-9/12 mx-auto border-opacity-40 shadow-special shadow-md">
                    <mapComponent ref="map" />
                    <div class="py-2 border-t ">
                        <p class="text-md w-11/12 mx-auto">Informations des voitures</p>
                        <div class="border w-11/12 mx-auto rounded-lg border-text border-opacity-20 shadow-sm">
                            <!--TODO : Ajouter un filtre pour le nombre maximum à afficher de voitures-->
                            <div class=" text-sm border-b border-text border-opacity-10 py-2 shadow-md text">
                                <div class="flex  text-text text-opacity-75 text-center">
                                    <div class="w-1/12">Nom</div>
                                    <div class="w-2/12 ">Marque</div>
                                    <div class="w-2/12 ">Modèle</div>
                                    <div class="w-2/12 ">Plaque</div>
                                    <div class="w-2/12 ">Couleur</div>
                                    <div class="w-2/12 ">Temps restant</div>
                                </div>
                            </div>
                            <div v-for="user in userslist" :key="user._id">
                                <button @click=" selectUser(user._id)" class="car-item"
                                    :class="{ ' selected-car': selectedCar === user._id }">
                                    <div class="flex ">
                                        <div class="w-1/12 ">{{ user.username }}</div>
                                        <div class="w-2/12 ">{{ user.voiture.marque }}</div>
                                        <div class="w-2/12 ">{{ user.voiture.modele }}</div>
                                        <div class="w-2/12 ">{{ user.voiture.plaque }}</div>
                                        <div class="w-2/12">{{ user.voiture.couleur }}</div>
                                        <div class="w-2/12 ">{{ showTimeLeft(user.voiture.timeToLeave) }}</div>
                                        <div class="w-1/12 flex justify-between">
                                            <RouterLink :to="{ params: { userId: user._id }, name: 'deplacement', }">
                                                <CarIcon class="icon mx-1" />
                                            </RouterLink>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
