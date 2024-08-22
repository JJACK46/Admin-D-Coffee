<template>
  <ProductDialog />
  <TableLayout
    title="Product Management"
    :items="store.products"
    :headers="store.headers"
    customColumnName="imageName"
    :search="searchText"
    :callback-func="store.fetchAll"
    has-action
  >
    <template #topCardText>
      <v-row>
        <v-col cols="10">
          <SearchTableField @get-search-text="handleSearchText" />
        </v-col>
        <v-col>
          <v-btn
            color="secondary"
            rounded="xl"
            class="w-100"
            prepend-icon="mdi-plus"
            @click="store.openDialog()"
            >New</v-btn
          >
        </v-col>
      </v-row>
    </template>
    <template #imageName="{ item }">
      <v-img
        v-if="item.imageName"
        height="100"
        :src="`${baseURLImage}/products/${item.imageName}`"
        :alt="'Image of ' + item.imageName"
      ></v-img>
      <i v-else>No Image</i>
    </template>
    <template #actions="{ item }">
      <v-icon size="small" class="me-2" @click="store.openDialog(item)"> mdi-pencil </v-icon>
      <v-icon size="small" @click="store.deleteItem(item.id)"> mdi-delete </v-icon>
    </template>
  </TableLayout>
</template>

<script setup lang="ts">
import TableLayout from '@/layouts/TableLayout.vue'
import { useProductStore } from '../store/product'
import ProductDialog from '../components/ProductDialog.vue'
import { baseURLImage } from '@/services/http'
import SearchTableField from '@/components/SearchTableField.vue'
import { ref } from 'vue'

const store = useProductStore()

const searchText = ref()

function handleSearchText(value: string) {
  searchText.value = value
}
</script>
