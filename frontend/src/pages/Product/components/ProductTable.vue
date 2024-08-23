<script setup lang="ts">
import { useLoadingStore } from '@/stores/loading'
import { useProductStore } from '@/stores/product'
import { baseURLImage } from '@/services/http'
const store = useProductStore()
const loading = useLoadingStore()
</script>
<template>
  <v-skeleton-loader v-if="loading.isLoading" type="table"></v-skeleton-loader>
  <v-data-table v-else class="h-100" fixed-header :headers="store.headers" :items="store.products">
    <template v-slot:item="{ item }">
      <tr>
        <td>{{ item.id }}</td>
        <td v-if="item.imageName">
          <v-img
            :src="`${baseURLImage}/products/${item.imageName}`"
            :alt="'Image of ' + item.imageName"
          ></v-img>
        </td>
        <td v-else>
          <i>No Image</i>
        </td>
        <td>{{ item.name }}</td>
        <td>{{ item.price }}</td>
        <td>{{ item.type }}</td>
        <td>
          <v-icon size="small" class="me-2" @click="store.openDialog(item)"> mdi-pencil </v-icon>
          <v-icon size="small" @click="store.deleteItem(item.id!)"> mdi-delete </v-icon>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>
