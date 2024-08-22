<template>
  <v-skeleton-loader v-if="loader.isLoading" type="card" class="mb-5"></v-skeleton-loader>
  <v-card v-else class="mt-5 mb-6 w-auto mx-auto pa-4" rounded="xl" id="card-profile">
    <v-row class="d-flex justify-center">
      <v-col sm="5" md="3" lg="2">
        <v-img
          class="mx-auto"
          width="200"
          height="200"
          style="border-radius: 50%; min-width: 200px; min-height: 200px"
          :src="imageUrl"
        >
          <template #error>
            <div style="background: gray; width: 100%; height: 100%"></div>
          </template>
        </v-img>
      </v-col>
      <v-col cols="auto" class="mx-2">
        <slot name="content"></slot>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import { useLoadingStore } from '@/stores/loading'

const loader = useLoadingStore()
defineProps<{
  imageUrl: string
}>()
</script>
