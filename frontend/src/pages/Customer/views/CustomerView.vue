<template>
  <CustomerDialog />
  <TableLayout
    :title="`${t('Customer Management')}`"
    :callback-func="store.fetchAll"
    :items="store.getCustomers"
    :headers="store.headers"
    has-action
    custom-column-name="imageUrl"
  >
    <template #topCardText>
      <v-row>
        <v-col cols="9">
          <SearchTableField @get-search-text="handleSearchText" />
        </v-col>
        <v-col>
          <v-btn
            prepend-icon="mdi-plus"
            @click="store.openDialog()"
            class="w-100 h-100"
            variant="flat"
            color="secondary"
            >New</v-btn
          >
        </v-col>
      </v-row>
    </template>
    <template #imageUrl="{ item }">
      <ImageColumnTable :image-url="`${baseURLImage}/customers/${item.imageUrl}`" />
    </template>
    <template #actions="{ item }">
      <v-icon size="small" class="me-2" @click="store.openDialog(item)"> mdi-pencil </v-icon>
      <v-icon size="small" @click="store.deleteItem(item.id)"> mdi-delete </v-icon>
    </template>
  </TableLayout>
</template>

<script setup lang="ts">
import TableLayout from '@/components/MainTable.vue'
import { useCustomerStore } from '@/stores/customer'
import CustomerDialog from '../components/CustomerDialog.vue'
import SearchTableField from '@/components/SearchTableField.vue'
import { ref } from 'vue'
import { baseURLImage } from '@/services/http'
import ImageColumnTable from '@/components/ImageColumnTable.vue'
import { useLocale } from 'vuetify'

const store = useCustomerStore()
const { t } = useLocale()
const searchText = ref()

function handleSearchText(value: string) {
  searchText.value = value
}
</script>
