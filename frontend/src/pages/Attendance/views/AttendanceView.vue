<script setup lang="ts">
import TableLayout from '@/layouts/TableLayout.vue'
import { useAttendanceStore } from '../stores/attendance'
import { ref } from 'vue'
import SearchTableField from '@/components/SearchTableField.vue'

const store = useAttendanceStore()

const searchText = ref()

function handleSearch(value: string) {
  searchText.value = value
}
</script>

<template>
  <TableLayout
    title="Attendance"
    :callback-func="store.fetchAll"
    :items="store.items"
    :headers="store.headers"
    :search="searchText"
  >
    <template #topCardText>
      <v-row>
        <v-col cols="10">
          <SearchTableField @get-search-text="handleSearch" />
        </v-col>
        <v-col>
          <v-btn
            color="secondary"
            rounded="xl"
            variant="flat"
            class="h-100 w-100"
            @click="store.openDialog"
            >Attendance Work</v-btn
          >
        </v-col>
      </v-row>
    </template>
  </TableLayout>
</template>
