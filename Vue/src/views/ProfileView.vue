<script setup>

</script>

<template>
        <div>
            <div class=" w-6/12 my-8 mx-auto border shadow-md border-opacity-20 border-text shadow-text rounded-xl">
                <p class="text-xl my-3 w-11/12 mx-auto">Profil</p>
                <form class="">
                    <div class=" mx-auto w-10/12">
                        <p class="text-xl my-3">Informations personnelles</p>
                        <div class="flex flex-col">
                            <label for="username">Nom d'utilisateur</label>
                            <input id="username"  class=" w-4/12 rounded-3xl py-1 border border-text" type="text">
                        </div>
                        <div class="flex flex-col">
                            <label for="email">Email</label>
                            <input id="email"  class=" w-4/12 rounded-3xl py-1 border border-text" type="text">
                        </div>
                        <p class=" font-bold text-xl">Voiture</p>
                        <div class="flex flex-col">
                            <label for="Imatriculation">Imatriculation</label>
                            <input id="Imatriculation" class=" w-4/12 rounded-3xl py-1 border border-text" type="text">
                        </div>
                        <div class="flex flex-col">
                            <label for="marque">Marque</label>
                            <input id="marque" class=" w-4/12 rounded-3xl py-1 border border-text" type="text">
                        </div>
                        <div class="flex flex-col">
                            <label for="modele">modele</label>
                            <input class=" w-4/12 rounded-3xl py-1 border border-text" id="Modele" type="text">
                        </div>
                        <div class="flex flex-col">
                            <label for="couleur">Couleur</label>
                            <input id="couleur" class=" w-4/12 rounded-3xl py-1 border border-text" type="text">
                        </div>
                        <div class=" w-min mx-auto my-4">
                            <button class=" p-2 border-text border rounded">Soummettre</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
</template>
