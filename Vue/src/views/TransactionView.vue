<script setup>

import LowerNav from '../components/LowerNav.vue';
import { useAuthStore } from '../stores/userStore'
</script>

<script>

export default {
  data() {
    return {
      factures: null,
      histos: null,
    }

  },
  created() {

  },
  methods: {

  }
}

</script>


<template>
  <div class=" mx-auto my-4">
    <div
      class=" lg:w-5/12 md:w-6/12 w-10/12 my-8 mx-auto border shadow-md border-opacity-20 border-text shadow-text rounded-sm">
      <LowerNav />
      <div class=" flex justify-around my-4">
        <div class="flex my-auto">
          <p>Solde à payer: <span class="font-bold px-3">10 $</span></p>
        </div>
        <button class="border-text border p-2 rounded-md">PAYER MAINTENANT</button>
      </div>
      <div class="w-10/12 mx-auto">
        <div class="my-4">
          <p>Historique de factures</p>
          <div class="shadow-md shadow-text rounded-md border-text border border-opacity-20">
            <div class="flex py-3 border-text border-b border-opacity-20">
              <div class="w-9/12 ms-3">
                <p>Date</p>
              </div>
              <div class="">
                <p>Montant</p>
              </div>
            </div>
            <div>
              <div class="flex py-3 border-text border-b border-opacity-20">
                <div class="w-9/12 ms-3">
                  <p>2023-11-03 16 h 27 min 48 sec</p>
                </div>
                <div>
                  <p class="w-3/12 ">24$</p>
                </div>
              </div>
              <div class="flex py-3 border-text border-b border-opacity-20">
                <div class="w-9/12 ms-1">
                  <p>2023-11-15 13 h 42 min 17 sec</p>
                </div>
                <div>
                  <p class="w-3/12">24$</p>
                </div>
              </div>
            </div>
            <div class="flex py-3">
              <div class="w-9/12 ms-1">
                <p>2023-12-03 15 h 00 min 04 sec</p>
              </div>
              <div>
                <p class="w-3/12">24$</p>
              </div>
            </div>
          </div>
        </div>

        <div class="my-4">
          <p>Historique des déplacements</p>
          <div class="shadow-md shadow-text rounded-md border-opacity-20 border-text border">
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
            <div class="flex py-3 border-text border-b border-opacity-20">
              <div class="w-8/12 ms-1">
                <p>2023-10-05 09 h 12 min 48 sec</p>
              </div>
              <div class="w-2/12 mx-1">
                <p>3$</p>
              </div>
              <div class="w-2/12 mx-1">
                <p>Non</p>
              </div>
            </div>
            <div class="flex py-3 border-text border-b border-opacity-20">
              <div class="w-8/12 ms-1">
                <p>2023-11-11 17 h 32 min 25 sec</p>
              </div>
              <div class="w-2/12 mx-1">
                <p>3$</p>
              </div>
              <div class="w-2/12 mx-1">
                <p>Oui</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
