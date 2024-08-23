<script setup lang="ts">
import { useMainDrawerStore } from './stores/drawer'
import { useDisplay } from 'vuetify'
import { computed, watch } from 'vue'
import MainLayout from './layouts/MainLayout.vue'
import FullLayout from './layouts/FullLayout.vue'
import { useRoute } from 'vue-router'

const drawer = useMainDrawerStore()
const route = useRoute()
const layout = computed(() => route.meta.layout ?? 'main')

watch(useDisplay().mdAndDown, () => {
  drawer.closeDrawer()
})
</script>

<template>
  <v-app>
    <MainLayout v-if="layout === 'main'" />
    <FullLayout v-else-if="layout === 'full'" />
  </v-app>
</template>

<style>
*,
.v-application .v-application--wrap * {
  font-family: 'Kanit';
}

.bg-img {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 100vh;
  width: 100%;
  z-index: -10;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #38220f9f;
}
</style>
