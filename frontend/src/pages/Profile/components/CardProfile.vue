<template>
  <v-skeleton-loader v-if="loader.isLoading" type="card" class="mb-5"></v-skeleton-loader>
  <v-card v-else class="pa-4">
    <v-row class="justify-center align-center">
      <v-col cols="auto">
        <v-img :src="imageUrl" width="170" height="170" rounded="circle">
          <template #error>
            <div style="background: gray; width: 100%; height: 100%"></div>
          </template>
        </v-img>
      </v-col>
      <v-col cols="auto">
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
