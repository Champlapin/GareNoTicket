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
    async signup() {
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
  <div class="w-[40%] mx-auto">
    <form class="flex flex-col" @submit.prevent="signup">
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
      <div class="py-1 my-2 border-b border-gray-300">
        <button type="submit" class="p-2 rounded border border-text">Login</button>
      </div>
      <div class="my-2">
        <RouterLink :to="{ name: 'signup' }" class="border rounded p-2 border-text">Create an account</RouterLink>
      </div>
    </form>
    <button class=" p-2 border rounded border-text transition-all active:bg-text active:text-background" type="button" @click="toggleDarkMode">Toggle Dark Mode</button>
    <p>{{ isDark }}</p>
  </div>
</template>


