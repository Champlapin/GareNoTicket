<script setup>
import mapComponent from '../components/mapComponent.vue';
import locationIcon from '../components/icons/locationIcon.vue';
import LowerNav from '../components/LowerNav.vue';
import CarIcon from '../components/icons/CarIcon.vue';

//TODO : Créer une distinction entre ce que le valet voit et l'utilisateur normale. Pour ça, on va utliser une bordure verte ou shadow vert.
</script>

<template>
    <div>
        <div class="my-4">
            <div class=" container mx-auto">
                <div class=" border-text border rounded-lg w-7/12 mx-auto border-opacity-20">
                    <LowerNav/>
                    <mapComponent />
                    <div class="py-2 border-t ">
                        <p class="text-md w-11/12 mx-auto">Informations des voitures</p>
                        <div class="border w-11/12 mx-auto rounded-lg border-text border-opacity-20 shadow-sm">
                            <div class=" text-sm border-b border-text border-opacity-10 py-2 shadow-md text">
                                <div class="flex  mx-3 text-text text-opacity-75">
                                    <div class="w-1/12">Nom</div>
                                    <div class="w-2/12 ">Marque</div>
                                    <div class="w-2/12 ">Modèle</div>
                                    <div class="w-2/12 ">Plaque</div>
                                    <div class="w-2/12 ">Couleur</div>
                                    <div class="w-2/12 ">Temps restant</div>
                                </div>
                            </div>
                            <div class="text-sm border-text border-b border-opacity-10 px-3 py-2">
                                <div class="flex ">
                                    <div class="w-1/12 ">James</div>
                                    <div class="w-2/12 ">Toyota</div>
                                    <div class="w-2/12 ">Corolla</div>
                                    <div class="w-2/12 ">123 ABC</div>
                                    <div class="w-2/12">Bleu</div>
                                    <div class="w-2/12 ">Demain</div>
                                    <div class="w-1/12 flex justify-between">
                                        <button>
                                            <locationIcon class="mx-1" />
                                        </button>
                                        <button>
                                            <CarIcon />
                                        </button>
                                    </div>
                                </div>
                            </div>
                             <div class="text-sm border-text border-b border-opacity-10 mx-3 py-2">
                                    <div class="flex ">
                                        <div class="w-1/12 ">James</div>
                                        <div class="w-2/12 ">Toyota</div>
                                        <div class="w-2/12 ">Corolla</div>
                                        <div class="w-2/12 ">123 ABC</div>
                                        <div class="w-2/12">Bleu</div>
                                        <div class="w-2/12 ">Demain</div>
                                        <div class="w-1/12 flex justify-between">
                                            <button>
                                                <locationIcon class="mx-1" />
                                            </button>
                                            <button>
                                                <CarIcon />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
