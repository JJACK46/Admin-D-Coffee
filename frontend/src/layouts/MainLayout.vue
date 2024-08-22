<template>
  <v-layout app class="h-screen">
    <!-- <span
        name="backgroundDialog"
        v-if="drawer.isDrawerExpand && auth.showAppBar"
        class="h-screen w-100"
        :style="{
          position: 'fixed',
          background: 'rgba(0,0,0,0.5)',
          zIndex: '1'
        }"
      >
      </span> -->
    <MainAppBar v-if="auth.showAppBar" />
    <MainDrawer v-if="auth.showAppBar" />
    <v-main app class="overflow-y-auto">
      <RouterView />
    </v-main>
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
  </v-layout>
</template>

<script lang="ts" setup>
import MainAppBar from '@/components/MainAppBar.vue'
import MainDrawer from '@/components/MainDrawer.vue'
import AttendanceDialog from '@/pages/Attendance/components/AttendanceDialog.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
</script>
