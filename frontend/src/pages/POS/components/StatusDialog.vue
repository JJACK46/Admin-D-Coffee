<script setup lang="ts">
import { usePosStore } from '@/stores/pos'

const store = usePosStore()
</script>

<template>
  <v-dialog class="mx-auto" max-width="500" v-model="store.isDialogStatusOpen" persistent>
    <v-card rounded="lg">
      <h3 class="mx-auto text-center text-capitalize pa-3">Order status</h3>
      <v-divider></v-divider>
      <span class="mx-auto text-center text-capitalize pa-5">
        <v-icon :icon="store.statusObject?.icon" :color="store.statusObject?.color" size="120">
        </v-icon>
        <h1>{{ store.statusObject?.text }}</h1>
      </span>
      <v-divider></v-divider>
      <v-card-actions class="justify-center d-flex">
        <v-btn to="/receipt" target="_blank" prepend-icon="mdi-clock" variant="text"
          >Visit History</v-btn
        >
        <v-btn @click="store.closeDialogStatus" variant="text">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
