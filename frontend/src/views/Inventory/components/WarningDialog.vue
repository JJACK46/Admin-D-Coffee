<template>
  <v-dialog v-model="isDialogOpen" persistent>
    <template #activator="{ props }">
      <slot name="activator" :props="props"></slot>
    </template>
    <v-row justify="center">
      <v-card class="pa-5" rounded>
        <template #loader>
          <v-progress-linear v-if="loader.isLoading" indeterminate></v-progress-linear>
        </template>
        <h2 class="text-center">Confirmation</h2>
        <v-divider></v-divider>
        <p>
          The following information will be securely recorded by the system during this process.
          <br />
        </p>
        <span class="text-red">
          Verified by
          <span class="font-weight-bold">{{ auth.getCurrentUser()?.fullName + ' ' }}</span>
        </span>
        <template #actions>
          <v-row class="justify-center">
            <v-btn @click="isDialogOpen = false" variant="outlined" color="red"> No </v-btn>
            <v-btn @click="$props.saveCallback" variant="tonal" color="green"> Yes </v-btn>
          </v-row>
        </template>
      </v-card>
    </v-row>
  </v-dialog>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useLoadingStore } from '@/stores/loading'
import { ref } from 'vue'

const auth = useAuthStore()
const loader = useLoadingStore()
const isDialogOpen = ref(false)

defineProps<{
  saveCallback: Function
}>()
</script>
