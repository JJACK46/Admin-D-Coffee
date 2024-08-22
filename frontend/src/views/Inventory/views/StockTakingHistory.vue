<script setup lang="ts">
import { ref } from 'vue'
import { useStockTakingStore } from '../store/stockTaking'
import TableLayout from '@/layouts/TableLayout.vue'
import SearchTableField from '@/components/SearchTableField.vue'
import ExportFileButton from '@/components/ExportFileButton.vue'

const store = useStockTakingStore()

const headers = [
  { title: 'ID', key: 'id', sortable: false },
  { title: 'Inventory', key: 'inventoryName', sortable: false },
  { title: 'Employee', key: 'employeeName', sortable: false },
  { title: 'Date', key: 'createdDate', sortable: true },
  { title: 'Time', key: 'createdTime', sortable: true }
]

const expandHeaders = [
  { title: 'ID', key: 'id', sortable: true },
  { title: 'Inventory Item ID', key: 'inventoryItem.id', sortable: true },
  { title: 'Ingredient', key: 'inventoryItem.ingredientName', sortable: false },
  { title: 'Old Balance', key: 'balanceOld', sortable: false },
  { title: 'Last Balance', key: 'balanceUpdate', sortable: false }
]

const searchText = ref()
</script>

<template>
  <TableLayout
    title="Stock-taking History"
    show-expand
    :items="store.stockTakingHistory"
    :headers="headers"
    :search="searchText"
    sort-desc
    :callback-func="store.fetchStockTakingHistory"
    has-filter
    v-model:month="store.filterQuery.month"
    v-model:year="store.filterQuery.year"
    :reload-func="store.fetchFilterStockTaking"
  >
    <template #topCardText>
      <v-row>
        <v-col cols="10">
          <SearchTableField @get-search-text="(v) => (searchText = v)"></SearchTableField>
        </v-col>
        <v-col cols="2">
          <ExportFileButton
            :callback-pdf="store.exportPDF"
            :filename-c-s-v="`${store.getCurrentInventoryTitle}-stock-taking`"
            :data-c-s-v="store.getDataCSV()"
          ></ExportFileButton>
        </v-col>
      </v-row>
    </template>
    <template #expanded-row="{ item }">
      <v-data-table class="border" :items="item.stockTakingItems" :headers="expandHeaders">
        <template #bottom></template
      ></v-data-table>
    </template>
  </TableLayout>
</template>
