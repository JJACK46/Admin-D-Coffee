<script setup lang="ts">
import { useIngredientStore } from '../stores/ingredient'
import IngredientDialog from '../components/IngredientDialog.vue'
import TableLayout from '@/layouts/TableLayout.vue'
import SearchTableField from '@/components/SearchTableField.vue'
import { ref } from 'vue'

const store = useIngredientStore()

const searchText = ref()

function handleSearch(value: string) {
  searchText.value = value
}
</script>

<template>
  <IngredientDialog />
  <TableLayout
    title="Ingredient Management"
    :items="store.ingredients"
    :headers="store.headers"
    :callback-func="store.fetchAll"
    :search="searchText"
    has-action
  >
    <template #topCardText>
      <v-row>
        <v-col cols="9">
          <SearchTableField @get-search-text="handleSearch" />
        </v-col>
        <v-col>
          <v-btn
            prepend-icon="mdi-plus"
            color="secondary"
            rounded="xl"
            class="w-100"
            @click="store.openDialog()"
            >New</v-btn
          >
        </v-col>
      </v-row>
    </template>
    <template #actions="{ item }">
      <v-icon size="small" class="me-2" @click="store.openDialog(item)"> mdi-pencil </v-icon>
      <v-icon size="small" @click="store.deleteItem(item.id!)"> mdi-delete </v-icon>
    </template>
  </TableLayout>
</template>
