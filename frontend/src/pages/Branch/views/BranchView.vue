<script setup lang="ts">
import { ref } from 'vue'
import BranchDialog from '../components/BranchDialog.vue'
import { useBranchStore } from '../stores/branch'
import TableLayout from '@/components/MainTable.vue'
import SearchTableField from '@/components/SearchTableField.vue'

const store = useBranchStore()

const searchText = ref()

function handleSearchText(value: string) {
  searchText.value = value
}
</script>

<template>
  <BranchDialog></BranchDialog>
  <TableLayout
    title="Branch Management"
    has-action
    :items="store.branchList"
    :headers="store.headers"
    :search="searchText"
    :callback-func="store.fetchAll"
  >
    <template #topCardText>
      <v-row>
        <v-col cols="9">
          <SearchTableField @get-search-text="handleSearchText" />
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
