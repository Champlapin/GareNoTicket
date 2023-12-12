<script setup>

import LowerNav from '../components/LowerNav.vue';
import { useAuthStore } from '../stores/userStore';
import PayementIcon from '../components/icons/PayementIcon.vue'
import { useToast } from 'vue-toast-notification';

</script>

<script>

export default {
  data() {
    return {
      factures: null,
      histos: null,
    }

  },
  async created() {
    this.$userStore = useAuthStore()
    this.$toast = useToast()
    this.$userStore.getFacture().then((res) => {
      if (res) {
        console.log(res)
        this.factures = res
      }
    })
    this.$userStore.getHistos().then((res) => {
      if (res) {
        console.log(res)
        this.histos = res
      }
    })

  },
  mounted() {

  },
  methods: {
    hasFacture() {
      return this.factures ? this.factures.length > 0 : false;
    },
    hasHistos() {
      return this.histos ? this.histos.length > 0 : false;
    },
    formatDate(date) {
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')} h ${String(date.getMinutes()).padStart(2, '0')} min `;
    },
    Payer() {
      this.$userStore.payerFacture().then((res) => {
        console.log(res)
        if (res.factures) {
          this.$toast.success("Transaction terminé", { position: 'top-right', duration: 5000, showProgressBar: true });
          this.factures = res.factures
          this.histos = res.histos
        }
        else {
          this.$toast.error("Une érreur s'est produite lors du paiement ", { position: 'top-right', duration: 5000, showProgressBar: true });
        }
      })
    },
    getSolde() {
      let somme = 0
      if (this.histos) {
        for (const histo of this.histos) {
          somme += !histo.isPaid ? histo.price : 0;
        }
      }
      return somme
    }
  }
}

</script>

<template>
  <div class=" mx-auto my-4">
    <div
      class=" lg:w-5/12 md:w-6/12 w-10/12 my-8 mx-auto border shadow-md border-opacity-20 border-text shadow-text rounded-sm">
      <LowerNav />
      <div
        class=" flex justify-around py-3 border-b border-text border-opacity-40 shadow-sm bg-opacity-10 bg-text shadow-text">
        <div class="flex my-auto">
          <p>Solde à payer: <span class="font-bold px-3">{{ getSolde() }} $</span></p>
        </div>
        <button @click="Payer()" :disabled="getSolde() <= 0"
          :class="[getSolde() > 0 ? 'btn-payer-active' : 'btn-payer-inactive']">PAYER
          <PayementIcon class="mx-1 fill-inherit" />
        </button>
      </div>
      <div class="w-10/12 mx-auto">
        <div class="my-4">
          <p>Historique de factures</p>
          <div v-if="hasFacture()" class="shadow-md shadow-text rounded-md border-text border border-opacity-20">
            <div class="flex py-3 border-text border-b border-opacity-20">
              <div class="w-9/12 ms-3">
                <p>Date</p>
              </div>
              <div class="">
                <p>Montant</p>
              </div>
            </div>
            <div>
            </div>
            <div>
              <div v-for="facture in factures" :key="facture.id" class="flex py-3 border-text border-b border-opacity-20">
                <div class="w-9/12 ms-3">
                  <p>{{ formatDate(new Date(facture.createdAt)) }}</p>
                </div>
                <div>
                  <p class="w-3/12 ">{{ facture.price }}$</p>
                </div>
              </div>

            </div>

          </div>
          <div v-else class="text-opacity-70 text-text text-center">Vous n'avez aucune facture</div>
        </div>

        <div class="my-4">
          <p>Historique des déplacements</p>
          <div v-if="hasHistos()" class="shadow-md shadow-text rounded-md border-opacity-20 border-text border">
            <div class="flex py-3 border-text border-b border-opacity-20 ">
              <div class="w-8/12 ms-1">
                <p>Date</p>
              </div>
              <div class="w-2/12 mx-1">
                <p>Prix</p>
              </div>
              <div class="w-2/12 mx-1">
                <p>Payé</p>
              </div>
            </div>
            <div v-for="histo in histos" :key="histo.id">
              <div class="flex py-3 border-text border-b border-opacity-20">
                <div class="w-8/12 ms-1">
                  <p>{{ formatDate(new Date(histo.createdAt)) }}</p>
                </div>
                <div class="w-2/12 mx-1">
                  <p>{{ histo.price }}$</p>
                </div>
                <div class="w-2/12 mx-1">
                  <p class="transition-all" :class="{ 'text-special': histo.isPaid }">{{ histo.isPaid ? "Oui" : "Non" }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="text-opacity-70 text-text text-center">Vous n'avez aucun historique de déplacements</div>
        </div>
      </div>
  </div>
</div></template>
