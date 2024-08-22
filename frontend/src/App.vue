<script setup lang="ts">
import MainDrawer from './components/MainDrawer.vue'
import { useAuthStore } from './stores/auth'
import { useMainDrawerStore } from './stores/drawer'
import { useDisplay } from 'vuetify'
import { watch } from 'vue'
import { RouterView } from 'vue-router'
import AttendanceDialog from './pages/Attendance/components/AttendanceDialog.vue'
import MainAppBar from './components/MainAppBar.vue'
import MainLayout from './layouts/MainLayout.vue'

const auth = useAuthStore()
const drawer = useMainDrawerStore()

watch(useDisplay().mdAndDown, () => {
  drawer.closeDrawer()
})
</script>

<template>
  <v-app>
    <MainLayout />
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
