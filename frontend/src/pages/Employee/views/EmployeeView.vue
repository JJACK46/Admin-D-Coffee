<template>
  <EmployeeDialog />
  <TableLayout
    :title="`${t('Employee Management')}`"
    :search="searchText"
    :items="store.employees"
    :headers="store.headers"
    :callback-func="store.fetchAll"
    custom-column-name="imageUrl"
    hasAction
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
            variant="flat"
            >New</v-btn
          >
        </v-col>
      </v-row>
    </template>
    <template #imageUrl="{ item }">
      <ImageColumnTable
        :image-url="`${baseURLImage}/employees/${item.imageUrl}`"
      ></ImageColumnTable>
    </template>
    <template #actions="{ item }">
      <v-icon size="small" class="me-2" @click="store.openDialog(item)"> mdi-pencil </v-icon>
      <v-icon size="small" @click="store.deleteItem(item.id!)"> mdi-delete </v-icon>
    </template>
  </TableLayout>
</template>

<script setup lang="ts">
import TableLayout from '@/components/MainTable.vue'
import { useEmployeeStore } from '@/stores/employee'
import EmployeeDialog from '../components/EmployeeDialog.vue'
import { ref } from 'vue'
import SearchTableField from '@/components/SearchTableField.vue'
import { baseURLImage } from '@/services/http'
import ImageColumnTable from '@/components/ImageColumnTable.vue'
import { useLocale } from 'vuetify'

const store = useEmployeeStore()
const { t } = useLocale()
const searchText = ref()

function handleSearchText(value: string) {
  searchText.value = value
}
</script>
