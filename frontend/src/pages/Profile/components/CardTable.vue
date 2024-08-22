<script setup lang="ts">
import { useLoadingStore } from '@/stores/loading'

defineProps<{
  title?: string
  items: Array<any>
  // headers: Object[]
}>()

const loader = useLoadingStore()
</script>

<template>
  <v-skeleton-loader v-if="loader.isLoading" height="280" type="card"></v-skeleton-loader>
  <v-card v-else elevation="0" class="ma-0" rounded="lg">
    <template v-if="$props.title" #title>
      <div class="text-center">
        {{ title }}
      </div>
    </template>
    <v-data-table
      :sort-by="[{ key: 'id', order: 'desc' }]"
      class="overflow-auto"
      density="compact"
      :items="items"
      height="280"
    >
    </v-data-table>
  </v-card>
</template>
