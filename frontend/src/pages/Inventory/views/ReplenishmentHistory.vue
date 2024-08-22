<script setup lang="ts">
import TableLayout from '@/layouts/TableLayout.vue'
import { useReplenishmentStore } from '../store/replenishment'
import { onMounted, ref } from 'vue'
import ExportFileButton from '@/components/ExportFileButton.vue'
import SearchTableField from '@/components/SearchTableField.vue'

const store = useReplenishmentStore()

onMounted(() => {
  store.fetchHistory()
})

const headers = [
  { title: 'ID', key: 'id', sortable: true },
  { title: 'Inventory', key: 'inventoryName', sortable: false },
  { title: 'Total Cost', key: 'totalCost', sortable: true },
  { title: 'Employee', key: 'employeeFullName', sortable: false },
  { title: 'Date', key: 'createdDate', sortable: true },
  { title: 'Time', key: 'createdTime', sortable: true }
]
const expandHeaders = [
  { title: 'ID', key: 'id', sortable: true },
  { title: 'Ingredient', key: 'ingredient.name', sortable: false },
  { title: 'Balance', key: 'balance', sortable: false },
  { title: 'Cost', key: 'cost', sortable: true }
]

const searchText = ref()
</script>

<template>
  <TableLayout
    title="Replenishment History"
    show-expand
    :items="store.replenishmentHistory"
    :headers="headers"
    :search="searchText"
    sort-desc
    has-filter
    v-model:month="store.filterQuery.month"
    v-model:year="store.filterQuery.year"
    :reload-func="store.fetchFilterReplenishment"
  >
    <template #topCardText>
      <v-row>
        <v-col cols="10">
          <SearchTableField @get-search-text="(v) => (searchText = v)"></SearchTableField>
        </v-col>
        <v-col cols="2">
          <ExportFileButton
            :filename-c-s-v="`${store.getCurrentInventoryTitle}-replenishment`"
            :data-c-s-v="store.getDataCSV()"
            :callback-pdf="store.exportPDF"
          ></ExportFileButton>
        </v-col>
      </v-row>
    </template>
    <template #expanded-row="{ item }">
      <v-data-table class="border" :items="item.replenishmentItems" :headers="expandHeaders">
        <template #bottom></template
      ></v-data-table>
    </template>
  </TableLayout>
</template>
