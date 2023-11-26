<script setup>
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, maxLength, sameAs, helpers } from '@vuelidate/validators'

const v$ = useVuelidate()

</script>

<script>
export default {

  data() {
    return {
      //TODO : Ajouter le changement des champs au cas d'invalidité. les classes invalides
      username: "",
      Email: "",
      password: '',
      confirmPassword: '',
      isDark: false,
    }
  },
  methods: {
    onSubmit() {
      console.log(this.Email);
    },
    toggleDarkMode() {
      this.isDark = this.isDark ? false : true;
      console.log(this.isDark)
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
      password: {
        required: helpers.withMessage('Ce champ est obligatoire', required),
        minLength: helpers.withMessage('Doit comporter au moins 6 caractères', minLength(6))
      },
      confirmPassword: {
        required: helpers.withMessage('Ce champ est obligatoire', required),
        sameAsPassword: helpers.withMessage('Doit être identique au mot de passe', sameAs(this.password))
      },
    }
  }
}
</script>

<template >
  <p class="text-3xl text-center">GareNoTicket</p>
  <div
    class=" lg:w-[30%] md:w-5/12 sm:w-6/12 w-8/12 mx-auto rounded border shadow-sm shadow-text border-text border-opacity-5 bg-white my-4">
    <div class=" border-b border-text border-opacity-20 py-1">
      <p class="text-xl text-center">Créer un compte</p>
      <p class="text-center text-text text-opacity-50">En quelques clicks.</p>
    </div>
    <form @submit.prevent="onSubmit">
      <div class="flex flex-col w-10/12  mx-auto ">
        <div class=" my-1 flex flex-col ">
          <input @blur="v$.username.$touch"
            class=" border transition-all focus:outline-none focus:ring-accent focus:ring-1 my-2 rounded p-1 w-full"
            placeholder="Nom d'utilisateur" aria-label="Username" type="text" v-model.trim="username" />
          <div class="text-sm text-text text-opacity-40" v-for="error of v$.username.$errors" :key="error.uid">
            {{ error.$message }}
          </div>
        </div>
        <div class=" my-1 flex flex-col ">
          <input @blur="v$.Email.$touch"
            class=" border transition-all focus:outline-none focus:ring-accent focus:ring-1 my-2 rounded p-1 w-full"
            placeholder="Email" aria-label="email" type="text" v-model="Email" />

          <div class="text-sm text-text text-opacity-40" v-for="error of v$.Email.$errors" :key="error.uid">
            {{ error.$message }}
          </div>
        </div>
        <div class=" my-1 flex flex-col">
          <input @blur="v$.password.$touch"
            class=" border transition-all focus:outline-none focus:ring-accent focus:ring-1 my-2 rounded p-1 w-full"
            placeholder="Mot de passe" aria-label="Password" type="password" v-model.trim="password" />
          <div class="text-sm text-text text-opacity-40" v-for="error of v$.password.$errors" :key="error.uid">
            {{ error.$message }}
          </div>
        </div>
        <div class=" my-1 flex flex-col">
          <input @blur="v$.confirmPassword.$touch"
            class=" border transition-all focus:outline-none focus:ring-accent focus:ring-1 my-2 rounded p-1 w-full"
            id="confirmPassword" type="password" placeholder="Confirmer le mot de passe" v-model.trim="confirmPassword
            " name="confirmPassword" />
          <div class="text-sm text-text text-opacity-40" v-for="error of v$.confirmPassword.$errors" :key="error.uid">
            {{ error.$message }}
          </div>
        </div>
      </div>
      <div class="py-2 border-gray-300  border-t">
        <div class=" lg:w-4/12 md:w-6/12 w-7/12  mx-auto">
          <button class="p-2 rounded-md bg-primary text-background w-full">Continuer</button>
        </div>
      </div>
    </form>
  </div>
</template>


