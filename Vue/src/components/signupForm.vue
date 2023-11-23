<script setup>
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';

const { errors, defineInputBinds } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      email: yup.string().email().max(50).required(),
      password: yup.string().min(6).required(),
    })
  ),
});

</script>

<script>
export default {

  data() {
    return {
      //TODO : Ajouter le changement des champs au cas d'invalidité. les classes invalides
      email: '',
      password: '',
      isDark: false,
    }
  },
  methods: {
    async login() {
      // Perform login logic here
      await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email: this.email, password: this.password,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => console.log(json));

      console.log(`Logging in with username ${this.email} and password ${this.password}`)
    },
    toggleDarkMode() {
      this.isDark = this.isDark ? false : true;
      console.log(this.isDark)
    }
  }
}
</script>

<template>
  <div class="w-[40%] mx-auto rounded-lg border shadow-sm shadow-text border-text">
    <form class="flex flex-col" @submit.prevent="login">
     <div class="flex flex-col my-1 ">
          <label class="" for="username">Username</label>
          <input
            class=" border placeholder-gray-500 border-gray-500 focus:outline-none focus:ring-accent focus:ring-1 my-2 rounded p-1"
            placeholder="john@gmail.com" id="username" type="text" v-model.trim="username" />
        </div>
      <div class="flex flex-col my-1 ">
        <label class="" for="email">Email</label>
        <input
          class=" border placeholder-gray-500 border-gray-500 focus:outline-none focus:ring-accent focus:ring-1 my-2 rounded p-1"
          placeholder="john@gmail.com" id="email" type="text" v-model.trim="email" />
      </div>
      <div class="flex flex-col my-1">
        <label for="password">Password</label>
        <input
          class=" border placeholder-gray-500 border-gray-500 focus:outline-none focus:ring-accent focus:ring-1 my-2 rounded p-1"
          id="password" type="password" v-model.trim="password" />
      </div>
      <div class="flex flex-col my-1">
          <label for="confirmPassword">Confirmer Password</label>
          <input
            class=" border placeholder-gray-500 border-gray-500 focus:outline-none focus:ring-accent focus:ring-1 my-2 rounded p-1"
            id="confirmPassword" type="password" v-model.trim="confirmPassword" />
        </div>
      <div class="py-1 my-2 border-b border-gray-300">
        <button type="submit" class="p-2 rounded border border-text">Signup</button>
      </div>
      <div class="my-2">
      </div>
    </form>
    <button class=" p-2 border rounded border-text transition-all active:bg-text active:text-background" type="button" @click="toggleDarkMode">Toggle Dark Mode</button>
    <p>{{ isDark }}</p>
  </div>
</template>


