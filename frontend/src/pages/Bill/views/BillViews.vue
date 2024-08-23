<script setup lang="ts">
import ExportFileButton from '@/components/ExportFileButton.vue'
import { useBillStore } from '@/stores/bill'
import TableLayout from '@/components/MainTable.vue'
import SearchTableField from '@/components/SearchTableField.vue'
import { ref } from 'vue'
import BillAddDialog from '../components/BillAddDialog.vue'
const store = useBillStore()
const searchText = ref()

function handleSearchText(value: string) {
  searchText.value = value
}
</script>

<template>
  <BillAddDialog />
  <TableLayout
    title="Bill Records"
    :search="searchText"
    :items="store.getBills"
    :headers="store.headers"
    :callback-func="store.fetchBills"
    custom-column-name="status"
  >
    <template #topCardText>
      <v-row>
        <v-col lg="7" sm="12">
          <SearchTableField @get-search-text="handleSearchText"></SearchTableField>
        </v-col>
        <v-col lg="5" sm="12">
          <v-row>
            <v-col>
              <v-btn
                class="w-100"
                rounded="pill"
                color="primary"
                variant="flat"
                prepend-icon="mdi-plus"
                text="Manual Add Bill"
                @click="store.openDialog"
              >
              </v-btn>
            </v-col>
            <v-col cols="auto">
              <ExportFileButton :callback-pdf="() => {}"></ExportFileButton>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </template>
    <template #status="{ item }">
      {{ item.status ? `paid` : `pending` }}
    </template>
  </TableLayout>
</template>
