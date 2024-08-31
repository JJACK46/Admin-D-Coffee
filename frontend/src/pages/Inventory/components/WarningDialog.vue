<template>
  <v-dialog v-model="isDialogOpen" persistent>
    <template #activator="{ props }">
      <slot name="activator" :props="props"></slot>
    </template>
    <v-row class="mx-auto">
      <v-card class="pa-5" rounded>
        <template #loader>
          <v-progress-linear v-if="loader.isLoading" indeterminate></v-progress-linear>
        </template>
        <template #title>
          <h2>Confirmation</h2>
          <v-divider></v-divider>
        </template>
        <template #text>
          <p>
            The following information will be securely recorded by the system during this process.
            <br />
          </p>
          <span class="text-red">
            Verified by
            <span class="font-weight-bold">{{ auth.getCurrentUser?.usr + ' ' }}</span>
          </span>
        </template>
        <template #actions>
          <div class="d-flex justify-end w-100">
            <v-btn @click="isDialogOpen = false" variant="text" color="error"> No </v-btn>
            <v-btn @click="saveCallback" variant="text" color="success"> Yes </v-btn>
          </div>
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
  saveCallback: () => any
}>()
</script>
