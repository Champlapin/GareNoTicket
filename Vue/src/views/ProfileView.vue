<script setup>
import { useToast } from 'vue-toast-notification'
import { useAuthStore } from '../stores/userStore'
import { useCarStore } from '../stores/carStore'
import LowerNav from '../components/LowerNav.vue';
import { required, email, minLength, maxLength, helpers, numeric } from '@vuelidate/validators'
import InfoIcon from '../components/icons/InfoIcon.vue';
import { useVuelidate } from '@vuelidate/core';
import 'vue-toast-notification/dist/theme-sugar.css';

</script>

<script>

export default {
    data() {
        return {
            v$: useVuelidate(),
            username: '',
            Email: '',
            plaque: '',
            marque: '',
            modele: '',
            couleur: '',
            price: 0,
        };
    },
    created() {
        this.$userStore = useAuthStore();
        this.$toast = useToast();
        this.$carStore = useCarStore();
        const user = this.$userStore.user;
        const car = this.$carStore.currentCar

        this.username = user.username
        this.Email = user.email
        this.price = user.price
        if (car) {
            this.plaque = car.plaque
            this.marque = car.marque
            this.modele = car.modele
            this.couleur = car.couleur
        }
    },
    methods: {
        async onSubmit() {
            this.v$.$touch()
            console.log(this.v$.$errors)

            if (this.v$.$errors.length <= 0) {
                if (!this.$carStore.isParked || this.$userStore.user.isValet) {

                    const user = { id: this.$userStore.user.id, username: this.username, email: this.Email, price: this.price }
                    const voiture = { plaque: this.plaque, marque: this.marque, modele: this.modele, couleur: this.couleur }

                    const userRes = await this.$userStore.update(user)
                    const carRes = await this.$carStore.update(user.id, voiture)
                    if (userRes) {
                        //TODO : Afficher le toast succés

                        this.$toast.success("Modifications enregistrés avec succès.", { position: 'top-right', duration: 5000, showProgressBar: true });
                    }
                    else {
                        //TODO ; modifier les champs érronnés ou afficher un toast temporairement.
                    }
                }
                else {
                    this.$toast.error("Impossible de modifier l'auto lorsqu'elle est garé.", { position: 'top-right', duration: 5000, showProgressBar: true });
                }
            }


        }
    },
    validations() {
        return {
            username: {
                required: helpers.withMessage('Ce champ est obligatoire', required),
                minLength: helpers.withMessage('Doit comporter au moins 3 caractères', minLength(3)),
                maxLength: helpers.withMessage('Doit comporter au plus 50 caractères', maxLength(50))
            },
            Email: {
                required: helpers.withMessage('Ce champ est obligatoire', required),
                email: helpers.withMessage('Doit être un email valide', email),
                maxLength: helpers.withMessage('Doit comporter au plus 50 caractères', maxLength(50))
            },
            plaque: {
                required: helpers.withMessage('Ce champ est obligatoire', required),
                maxLength: helpers.withMessage('Doit comporter 6 caractères', maxLength(6)),
                minLength: helpers.withMessage('Doit comporter 6 caractères', minLength(6))

            },
            marque: {
                required: helpers.withMessage('Ce champ est obligatoire', required),
                maxLength: helpers.withMessage('Doit comporter au plus 50 caractères', maxLength(50))

            },
            modele: {
                required: helpers.withMessage('Ce champ est obligatoire', required),
                maxLength: helpers.withMessage('Doit comporter au plus 50 caractères', maxLength(50))

            },
            couleur: {
                required: helpers.withMessage('Ce champ est obligatoire', required),
                minLength: helpers.withMessage('Doit comporter au moins 3 caractères', minLength(3)),
                maxLength: helpers.withMessage('Doit comporter au plus 50 caractères', maxLength(50))
            },
            price: {
                required: helpers.withMessage('Tarif invalide', required),
                numeric: helpers.withMessage('Tarif invalide', numeric),
            }
        }
    }
}

</script>

<template>
    <div>
        <div
            class=" lg:w-5/12 md:w-6/12 w-10/12 my-8 mx-auto border shadow-md border-opacity-20 border-text shadow-text rounded-sm">
            <LowerNav />
            <form @submit.prevent="onSubmit" class=" border-text rounded-sm">

                <div v-if="$carStore.isParked && !$userStore.user.isValet"
                    class="bg-accent rounded p-2 mx-1 flex justify-center my-4 shadow-text shadow">
                    <InfoIcon class="fill-background md:h-10 md:w-2/12 sm:h-12 sm:w-1/12" />
                    <p class="text-background text-sm mx-auto my-auto">Vous ne pouvez pas modifier votre compte si votre
                        véhicule est stationné.</p>
                </div>
                <div class="flex justify-between w-10/12 mx-auto">
                    <p class="text-xl my-3 font-bold">Compte</p>
                    <div v-if="$userStore.isValet" class="my-auto flex justify-end">
                        <p class="my-auto mx-4 text-lg text-special">Tarif</p>
                        <div class="">
                            <input type="number" v-model="price" class="input-1">
                            <div class="text-sm text-error text-opacity-75 absolute" v-for="error of v$.price.$errors"
                                :key="error.uid">
                                {{ error.$message }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class=" mx-auto w-10/12">
                    <div class="flex flex-col">
                        <label for="username">Nom d'utilisateur</label>
                        <input @blur="v$.username.$touch" id="username" class=" input-1 border" type="text"
                            v-model="username">
                        <div class="text-sm text-error text-opacity-75" v-for="error of v$.username.$errors"
                            :key="error.uid">
                            {{ error.$message }}
                        </div>
                    </div>
                    <div class="flex flex-col ">
                        <label for="email">Email</label>
                        <input @blur="v$.Email.$touch" id="email" class="input-1" type="text" v-model="Email">
                        <div class="text-sm text-error text-opacity-75" v-for="error of v$.Email.$errors" :key="error.uid">
                            {{ error.$message }}
                        </div>
                    </div>
                    <p class=" font-bold text-xl">Voiture</p>
                    <div class="flex flex-col">
                        <label for="plaque">Plaque</label>
                        <input @blur="v$.plaque.$touch" id="plaque" class=" input-1 " type="text" v-model="plaque">
                        <div class="text-sm text-error text-opacity-75" v-for="error of v$.plaque.$errors" :key="error.uid">
                            {{ error.$message }}
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <label for="marque">Marque</label>
                        <input @blur="v$.marque.$touch" id="marque" class=" input-1 " type="text" v-model="marque">
                        <div class="text-sm text-error text-opacity-75" v-for="error of v$.marque.$errors" :key="error.uid">
                            {{ error.$message }}
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <label for="modele">Modèle</label>
                        <input @blur="v$.modele.$touch" class=" input-1 " id="Modele" type="text" v-model="modele">
                        <div class="text-sm text-error text-opacity-75" v-for="error of v$.modele.$errors" :key="error.uid">
                            {{ error.$message }}
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <label for="couleur">Couleur</label>
                        <input @blur="v$.couleur.$touch" id="couleur" class=" input-1 " type="text" v-model="couleur">
                        <div class="text-sm text-error text-opacity-75" v-for="error of v$.couleur.$errors"
                            :key="error.uid">
                            {{ error.$message }}
                        </div>
                    </div>
                    <div class="py-1 my-2 mx-auto">
                        <button type="submit"
                            class="p-2 text-sm rounded-lg bg-primary text-background text shadow-md hover:shadow-accent hover:bg-accent transition-all duration-200 ">Enregistrer
                            les modifications</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
