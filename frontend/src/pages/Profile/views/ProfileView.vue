<script setup lang="ts">
import CustomerContent from '../components/CustomerContent.vue'
import CompanyContent from '../components/CompanyContent.vue'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'

const auth = useAuthStore()
</script>

<template>
  <v-container fluid>
    <v-btn
      variant="tonal"
      prepend-icon="mdi-arrow-left"
      text="Back"
      @click="
        () => {
          router.back()
        }
      "
    ></v-btn>
    <CustomerContent v-if="auth.isCustomer()"></CustomerContent>
    <CompanyContent v-else></CompanyContent>
  </v-container>
</template>
