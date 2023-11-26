<script setup>
import { RouterLink } from 'vue-router'
//TODO : Séparer la navigation dépendement de si l'utilisateur est authentifié en valet ou non.
</script>

<template>
  <nav>
    <nav class="my-5">
      <RouterLink :to="{ name: 'login' }" class=" rounded p-2 mx-3 border-text border ">Login</RouterLink>
      <RouterLink :to="{ name: 'home' }" class=" rounded p-2 mx-3 border-text border ">Home</RouterLink>
      <RouterLink :to="{ name: 'signup' }" class=" rounded p-2 mx-3 border-text border ">signup</RouterLink>
      <RouterLink :to="{ name: 'valet' }" class=" rounded p-2 mx-3 border-text border ">valet</RouterLink>
      <RouterLink :to="{ name: 'profile' }" class=" rounded p-2 mx-3 border-text border ">profile</RouterLink>
      <RouterLink :to="{ name: 'deplacement' }" class=" rounded p-2 mx-3 border-text border ">deplacement</RouterLink>
      <RouterLink :to="{ name: 'transaction' }" class=" rounded p-2 mx-3 border-text border ">Transactions</RouterLink>
    </nav>
  </nav>
</template>