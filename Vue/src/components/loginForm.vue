
<script>
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { useAuthStore } from '../stores/userStore'


export default {
  data() {
    return {
      v$: useVuelidate(),
      Email: '',
      password: '',
      isDark: false,

    }
  },
  created() {
    this.$store = useAuthStore() // Le store est maintenant disponible dans le composant
  },
  methods: {
    async onSubmit() {
      // TODO: Ajouter la validation du côté BD
      //let valide = await this.v$.$validate()

      try {
        const response = this.$store.login(this.Email, this.password)
       if (response) {
         this.$router.push({name : 'home'});
       }
      } catch (err) {
        console.log(err.message)
      }

      
    },
    toggleDarkMode() {
      this.isDark = this.isDark ? false : true;
      console.log(this.isDark)
    }
  },
  validations() {

    return {

      Email: {
        required: helpers.withMessage('Ce champ est obligatoire', required),
      },
      password: {
        required: helpers.withMessage('Ce champ est obligatoire', required),
      },
    }
  }
}
</script>

<template>
  <div class="w-[75%] mx-auto  my-4">
    <p class="text-3xl text-center">GareNoTicket</p>
    <div class="flex my-4">
      <div class="w-6/12">
        <!--TODO : Ajouter une image -->
      </div>
      <div class="w-6/12 ">
        <form
          class="flex flex-col w-7/12 shadow-sm shadow-text p-4 rounded-sm border border-text border-opacity-10 bg-white"
          @submit.prevent="onSubmit">
          <div class="flex flex-col my-1 ">
            <label class="" for="email">Email</label>
            <!--TODO : Changer l'ethétique des inputs pour ue le label soit dans le champs.-->
            <!--TODO : Demander quel messages afficher sur login.-->
            <input
              class=" input-1 "
              @blur="v$.Email.$touch" placeholder="john@gmail.com" id="email" type="text" v-model.trim="Email" />
            <div class="text-sm text-text text-opacity-40" v-for="error of v$.password.$errors" :key="error.uid">

            </div>
          </div>
          <div class="flex flex-col my-1">
            <label for="password">Mot de passe</label>
            <input
              class="input-1"
              @blur="v$.password.$touch" id="password" type="password" v-model.trim="password" />
            <div class="text-sm text-text text-opacity-40" v-for="error of v$.password.$errors" :key="error.uid">

            </div>
          </div>
            <div class="py-1 my-2 mx-auto">
              <button type="submit"
                class="p-2 rounded-lg bg-primary text-background text shadow-md hover:shadow-accent hover:bg-accent transition-all duration-200 ">Me
                connecter</button>
            </div>
          <div class="my-2">
            <p class="text-sm text-center">Vous n'avez pas de compte ? <RouterLink
                class="font-bold hover:border-opacity-100 border-b border-opacity-0 border-text duration-300 transition-all hover:text-accent hover:border-accent"
                :to="{ name: 'signup' }">Inscrivez-Vous </RouterLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


