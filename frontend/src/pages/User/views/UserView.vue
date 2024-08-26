<script setup lang="ts">
import { useUserStore } from '../../../stores/user'
import UserDialog from '../components/UserDialog.vue'
import Table from '@/components/MainTable.vue'
import SearchTableField from '@/components/SearchTableField.vue'
import { ref } from 'vue'
import { baseURLImage } from '@/services/http'
import ImageColumnTable from '@/components/ImageColumnTable.vue'
import type { User } from '../../../types/user'
const store = useUserStore()

const searchText = ref()

function handleSearchText(value: string) {
  searchText.value = value
}

function handleImageUrl(item: User) {
  if (item.employeeId) {
    return `${baseURLImage}/employees/${item.imageUrl}`
  }
  return `${baseURLImage}/customers/${item.imageUrl}`
}
</script>

<template>
  <UserDialog />
  <Table
    title="User Management"
    :callback-func="store.getAllUsers"
    :search="searchText"
    has-action
    :items="store.users"
    :headers="store.headers"
    customColumnName="imageUrl"
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
    <template #imageUrl="{ item }">
      <ImageColumnTable :image-url="handleImageUrl(item)" />
    </template>
    <template #actions="{ item }">
      <v-icon size="small" class="me-2" @click="store.openDialog(item)"> mdi-pencil </v-icon>
      <v-icon size="small" @click="store.deleteItem(item.id!)"> mdi-delete </v-icon>
    </template>
  </Table>
</template>
