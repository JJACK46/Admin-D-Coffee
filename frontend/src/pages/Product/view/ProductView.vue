<template>
  <ProductDialog />
  <TableLayout
    :title="`${t('Product Management')}`"
    :items="store.products"
    :headers="store.headers"
    customColumnName="imageName"
    :search="searchText"
    :callback-func="store.fetchAll"
    has-action
  >
    <template #topCardText>
      <v-row>
        <v-col cols="9">
          <SearchTableField @get-search-text="handleSearchText" />
        </v-col>
        <v-col>
          <v-btn
            color="secondary"
            class="w-100 h-100"
            variant="flat"
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
        width="100"
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
import TableLayout from '@/components/MainTable.vue'
import { useProductStore } from '@/stores/product'
import ProductDialog from '../components/ProductDialog.vue'
import { baseURLImage } from '@/services/http'
import SearchTableField from '@/components/SearchTableField.vue'
import { ref } from 'vue'
import { useLocale } from 'vuetify'

const store = useProductStore()
const { t } = useLocale()
const searchText = ref()

function handleSearchText(value: string) {
  searchText.value = value
}
</script>
