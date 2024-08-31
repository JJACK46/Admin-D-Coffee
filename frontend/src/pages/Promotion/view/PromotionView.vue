<template>
  <PromotionDialog />
  <TableLayout
    title="Promotion Management"
    has-action
    :items="store.promotions"
    :headers="store.headers"
    custom-column-name="discountPercentage"
    :search="searchText"
    :callback-func="store.fetchAll"
    show-expand
  >
    <template #topCardText>
      <v-row>
        <v-col cols="9">
          <SearchTableField @get-search-text="handleSearchText" />
        </v-col>
        <v-col>
          <v-btn
            class="w-100 h-100"
            color="secondary"
            @click="store.openDialog()"
            prepend-icon="mdi-plus"
            >New</v-btn
          >
        </v-col>
      </v-row>
    </template>
    <template #expanded-row="{ item }">
      <div>
        {{ `Description : ${item.description}` }}
      </div>
      <v-divider class="my-2"></v-divider>
      <div>
        {{ `Usable Product : ${item.usableProductsId}` }}
      </div>
    </template>
    <template #actions="{ item }">
      <v-icon size="small" class="me-2" @click="store.openDialog(item)"> mdi-pencil </v-icon>
      <v-icon size="small" @click="store.deleteItem(item.id!)"> mdi-delete </v-icon>
    </template>
    <template #discountPercentage="{ item }">
      {{ `${item.discountPercentage * 100}%` }}
    </template>
  </TableLayout>
</template>

<script setup lang="ts">
import TableLayout from '@/components/MainTable.vue'
import PromotionDialog from '../components/PromotionDialog.vue'
import { usePromotionStore } from '@/stores/promotion'
import { ref } from 'vue'
import SearchTableField from '@/components/SearchTableField.vue'

const store = usePromotionStore()

const searchText = ref()

function handleSearchText(value: string) {
  searchText.value = value
}
</script>
