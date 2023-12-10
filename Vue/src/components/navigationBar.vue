<script setup>
import { RouterLink } from 'vue-router'

</script>

<template>
  <div class="bg-text py-5 bg-opacity-5 shadow-md ">
    <nav>
        <nav>
          <RouterLink :to="{ name: 'login' }" class=" rounded p-2 mx-3 border-text border ">Login</RouterLink>
          <RouterLink :to="{ name: 'home' }" class=" rounded p-2 mx-3 border-text border ">Home</RouterLink>
          <RouterLink :to="{ name: 'signup' }" class=" rounded p-2 mx-3 border-text border ">signup</RouterLink>
          <RouterLink :to="{ name: 'valet' }" class=" rounded p-2 mx-3 border-text border ">valet</RouterLink>
          <RouterLink :to="{ name: 'profile' }" class=" rounded p-2 mx-3 border-text border ">profile</RouterLink>
            <RouterLink :to="{ name: 'transaction' }" class=" rounded p-2 mx-3 border-text border ">Transactions</RouterLink>
        </nav>
      </nav>
  </div>
</template>