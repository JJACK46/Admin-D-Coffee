<script setup lang="ts">
import { useLoadingStore } from '@/stores/loading'
import { useInventoryStore } from '../store/inventory'
const store = useInventoryStore()
const loading = useLoadingStore()

function handleHighlight(min: number, balance: number) {
  if (balance === 0) {
    return 'text-red'
  }
  if (store.isLowStock(min, balance)) {
    return 'text-orange'
  } else {
    return ''
  }
}
</script>

<template>
  <v-skeleton-loader v-if="loading.isLoading" type="table"> </v-skeleton-loader>
  <v-data-table
    v-else
    fixed-header
    :headers="store.headers"
    :items="store.getInventoryItems"
    class="h-100"
  >
    <template #item="{ item }">
      <tr :class="handleHighlight(item.minBalance, item.balance)">
        <td>{{ item.id }}</td>
        <td>{{ item.ingredient?.name }}</td>
        <td>{{ item.minBalance }}</td>
        <td>{{ item.balance }}</td>
        <td>{{ item.ingredient?.unit }}</td>
        <td>{{ store.getTextStatus(item.minBalance, item.balance) }}</td>
      </tr>
    </template>
  </v-data-table>
</template>
