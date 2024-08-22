<script setup lang="ts">
import { onMounted } from 'vue'
import { useProfileStore } from '../stores/profile'
import CustomerContent from '../components/CustomerContent.vue'
import CompanyContent from '../components/CompanyContent.vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const store = useProfileStore()
const auth = useAuthStore()
onMounted(() => {
  if (auth.isCustomer()) {
    store.fetchCustomerReceipts()
    store.fetchCustomer()
  } else {
    store.setupDTO()
    store.fetchAttendance()
    store.fetchSales()
    store.fetchSlips()
    store.fetchEmployee()
  }
})
const router = useRouter()

const goBack = () => {
  router.go(-1)
}
</script>

<template>
  <v-container fluid>
    <!-- <v-btn variant="tonal" prepend-icon="mdi-arrow-left" text="Back" @click="goBack"></v-btn> -->
    <CustomerContent v-if="auth.isCustomer()"></CustomerContent>
    <CompanyContent v-else></CompanyContent>
  </v-container>
</template>
