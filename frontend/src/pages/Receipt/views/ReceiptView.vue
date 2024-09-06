<template>
  <PreviewReceipt></PreviewReceipt>
  <TableLayout
    :title="`${t('Receipt Records')}`"
    :callback-func="store.fetchReceipts"
    show-expand
    :items="store.receipts"
    :headers="store.headers"
    :search="searchText"
    has-filter
    v-model:month="store.filterQuery.month"
    v-model:year="store.filterQuery.year"
    :reload-func="store.fetchFilterReceipts"
  >
    <template #topCardText>
      <v-row>
        <v-col>
          <SearchTableField @get-search-text="handleSearchText" />
        </v-col>
      </v-row>
    </template>
    <template #expanded-row="{ item }">
      <v-data-table class="border" :items="item.receiptItemsShort">
        <template #bottom></template>
      </v-data-table>
      <div class="justify-center mt-3">
        <v-row class="d-flex justify-center text-center">
          <v-col cols="auto">
            <v-btn
              @click="store.openDialog(item)"
              prepend-icon="mdi-information"
              variant="tonal"
              rounded="lg"
              >Full Details</v-btn
            >
          </v-col>
        </v-row>
      </div>
    </template>
  </TableLayout>
</template>

<script setup lang="ts">
import TableLayout from '@/components/MainTable.vue'
import { useReceiptStore } from '@/stores/receipt'
import PreviewReceipt from '../components/PreviewReceipt.vue'
import SearchTableField from '@/components/SearchTableField.vue'
import { ref } from 'vue'
import { useLocale } from 'vuetify'

const store = useReceiptStore()
const { t } = useLocale()
const searchText = ref()

function handleSearchText(value: string) {
  searchText.value = value
}
</script>
