<script setup>

import L from 'leaflet';
import { onMounted } from 'vue';

onMounted(() => {
    let map;
    map = L.map('map').setView([5.505, 5], 1)

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 10,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        accessToken: 'pk.eyJ1IjoiY2hhbXByZW1peDQiLCJhIjoiY2pkcWlnYmV4MXo0MzMzbDdtdnMyOWdjMSJ9.rPqi3578_IEmJ7qdD46iDw'
    }).addTo(map);
})
</script>


<template>
    <div id="map" class=" h-[320px] z-[1]">
    </div>
</template>
