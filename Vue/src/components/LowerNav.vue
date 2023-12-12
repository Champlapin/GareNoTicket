<script setup>
import { RouterLink } from 'vue-router'
//TODO : Séparer la navigation dépendement de si l'utilisateur est authentifié en valet ou non.
</script>

<template>
  <div class="bg-secondary py-2 shadow-sm shadow-text border border-text border-opacity-20">
    <nav>
      <nav class="flex justify-around text-center">
        <RouterLink :to="{ name: 'profile' }" active-class=" bg-text text-secondary"
          class=" border-2 transition-all active:bg-text active:text-secondary border-text  shadow-text shadow-sm rounded p-2 text-lg  w-4/12 ">
          Profile</RouterLink>
        <RouterLink :to="{ name: 'transaction' }" active-class=" bg-text text-secondary"
          class="border-2 transition-all active:bg-text active:text-secondary border-text  shadow-text shadow-sm rounded p-2 text-lg  w-4/12">
          Transactions</RouterLink>
      </nav>
    </nav>
  </div>
</template>