<script setup lang="ts">
import TableLayout from '@/components/MainTable.vue'
import { useAttendanceStore } from '@/stores/attendance'
import { ref } from 'vue'
import SearchTableField from '@/components/SearchTableField.vue'
import { useLocale } from 'vuetify'

const store = useAttendanceStore()
const { t } = useLocale()
const searchText = ref()

function handleSearch(value: string) {
  searchText.value = value
}
</script>

<template>
  <TableLayout
    :title="`${t('Attendance Management')}`"
    :callback-func="store.fetchAll"
    :items="store.items"
    :headers="store.headers"
    :search="searchText"
  >
    <template #topCardText>
      <v-row>
        <v-col>
          <SearchTableField @get-search-text="handleSearch" />
        </v-col>
        <v-col cols="3">
          <v-btn color="secondary" variant="flat" class="h-100 w-100" @click="store.openDialog">{{
            t('quickAct')
          }}</v-btn>
        </v-col>
      </v-row>
    </template>
  </TableLayout>
</template>
