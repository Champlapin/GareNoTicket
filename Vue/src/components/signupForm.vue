

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, maxLength, sameAs, helpers } from '@vuelidate/validators'
import { useAuthStore } from '../stores/userStore'
export default {
  data() {

    return {
      v$: useVuelidate(),
      username: "",
      Email: "",
      password: '',
      confirmPassword: '',
    }
  },
  created() {
    this.$userStore = useAuthStore();
  },
  methods: {
    async onSubmit() {
      //TODO : empêcher en cas de validation frontend invalide

      const res = this.$userStore.signup(this.Email,this.username,this.password,this.confirmPassword)

      if (res) {
        this.$router.push({ name: 'login' });
      }
      else {
        //TODO : Afficher les messages érreurs soit avec toasts ou les champs
      }

    },
    toggleDarkMode() {
      this.isDark = this.isDark ? false : true;
      console.log(this.isDark)
    }
  },
  validations() {
    const min_name_len = 3;
    const min_pass_len = 6;
    const max_name_len = 50;
    const max_email_len = 50;

    return {
      username: {
        required: helpers.withMessage('Ce champ est obligatoire', required),
        minLength: helpers.withMessage('Doit comporter au moins 3 caractères', minLength(min_name_len)),
        maxLength: helpers.withMessage('Doit comporter au plus 50 caractères', maxLength(max_name_len))
      },
      Email: {
        required: helpers.withMessage('Ce champ est obligatoire', required),
        email: helpers.withMessage('Doit être un email valide', email),
        maxLength: helpers.withMessage('Doit comporter au plus 50 caractères', maxLength(max_email_len))
      },
      password: {
        required: helpers.withMessage('Ce champ est obligatoire', required),
        minLength: helpers.withMessage('Doit comporter au moins 6 caractères', minLength(min_pass_len))
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
    class=" lg:w-[30%] md:w-5/12 sm:w-6/12 w-8/12 mx-auto rounded border shadow-sm shadow-text border-text border-opacity-20 bg-white my-4">
    <div class=" border-b border-text border-opacity-20 py-1">
      <p class="text-xl text-center">Créer un compte</p>
      <p class="text-center text-text text-opacity-50">En quelques clicks.</p>
    </div>
    <form @submit.prevent="onSubmit">
      <div class="flex flex-col w-10/12  mx-auto ">
        <div class=" my-1 flex flex-col ">
          <input @blur="v$.username.$touch"
            class=" input-1"
            placeholder="Nom d'utilisateur" aria-label="Username" type="text" v-model.trim="username" />
          <div class="text-sm text-text text-opacity-40" v-for="error of v$.username.$errors" :key="error.uid">
            {{ error.$message }}
          </div>
        </div>
        <div class=" my-1 flex flex-col ">
          <input @blur="v$.Email.$touch"
            class=" input-1 " placeholder="Email" aria-label="email" type="text" v-model="Email" />

          <div class="text-sm text-text text-opacity-40" v-for="error of v$.Email.$errors" :key="error.uid">
            {{ error.$message }}
          </div>
        </div>
        <div class=" my-1 flex flex-col">
          <input @blur="v$.password.$touch"
            class="input-1"
            placeholder="Mot de passe" aria-label="Password" type="password" v-model.trim="password" />
          <div class="text-sm text-text text-opacity-40" v-for="error of v$.password.$errors" :key="error.uid">
            {{ error.$message }}
          </div>
        </div>
        <div class=" my-1 flex flex-col">
          <input @blur="v$.confirmPassword.$touch"
            class=" input-1"
            id="confirmPassword" type="password" placeholder="Confirmer le mot de passe" v-model.trim="confirmPassword
              " name="confirmPassword" />
          <div class="text-sm text-text text-opacity-40" v-for="error of v$.confirmPassword.$errors" :key="error.uid">
            {{ error.$message }}
          </div>
        </div>
      </div>
      <div class="py-2 border-gray-300  border-t">
        <div class=" lg:w-4/12 md:w-6/12 w-7/12  mx-auto">
          <!--FIXME : Afficher la validation de côté bd.-->
          <button @click="v$.touch"
            class="p-2 rounded-lg bg-primary text-background w-full shadow-md hover:shadow-accent transition-all duration-200 hover:bg-accent ">Continuer</button>
        </div>
        <p class="text-center text-sm my-2">Vous avez déja un compte ? <RouterLink :to="{ name: 'login' }"
            class=" font-bold border-b border-accent hover:text-accent border-opacity-0 hover:border-opacity-100 transition-all duration-200 ">
            Connectez-Vous</RouterLink>
        </p>
      </div>
    </form>
  </div>
</template>


