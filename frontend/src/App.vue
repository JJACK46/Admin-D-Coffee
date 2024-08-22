<script setup lang="ts">
import MainDrawer from './components/MainDrawer.vue'
import { useAuthStore } from './stores/auth'
import { useMainDrawerStore } from './stores/drawer'
import { useDisplay } from 'vuetify'
import { watch } from 'vue'
import { RouterView } from 'vue-router'
import AttendanceDialog from './views/Attendance/components/AttendanceDialog.vue'
import MainAppBar from './components/MainAppBar.vue'

const auth = useAuthStore()
const drawer = useMainDrawerStore()

watch(useDisplay().mdAndDown, () => {
  drawer.closeDrawer()
})
</script>

<template>
  <AttendanceDialog />
  <v-snackbar
    class="text-center"
    v-model="auth.isTokenExpired"
    rounded
    variant="outlined"
    location="top"
    color="red"
    close-delay="5000"
  >
    <h2>Your token was expired or unauthorized, You need to login again. <br /></h2>
  </v-snackbar>
  <v-layout>
    <span
      name="backgroundDialog"
      v-if="drawer.isDrawerExpand && auth.showAppBar"
      class="h-screen w-100"
      :style="{
        position: 'fixed',
        background: 'rgba(0,0,0,0.5)',
        zIndex: '1'
      }"
    >
    </span>
    <MainAppBar v-if="auth.showAppBar" />
    <MainDrawer v-if="auth.showAppBar" />
    <v-main class="d-flex justify-center align-center pl-15 pr-15 overflow-auto">
      <RouterView />
    </v-main>
  </v-layout>
</template>

<style>
* {
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
