<script setup lang="ts">
import { usePayrollStore } from '../stores/payroll'
import { useLoadingStore } from '@/stores/loading'
import SlipView from '../components/SlipView.vue'
import SearchTableField from '@/components/SearchTableField.vue'
import { ref } from 'vue'

const loader = useLoadingStore()
const store = usePayrollStore()
const searchText = ref()

function handleSearchText(value: string) {
  searchText.value = value
}
</script>
<template>
  <SlipView />
  <v-container fluid>
    <v-card elevation="0" rounded="xl" class="mb-5">
      <v-card-title class="pa-5">
        <h2>Payroll Management</h2>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col col="10">
            <SearchTableField @get-search-text="handleSearchText" />
          </v-col>
          <v-col cols="auto">
            <v-btn-toggle class="h-100" variant="outlined">
              <v-btn @click="store.selectPending"> pending </v-btn>
              <v-divider vertical></v-divider>
              <v-btn @click="store.selectPaid"> paid </v-btn>
            </v-btn-toggle>
          </v-col>
          <v-col>
            <v-btn class="h-100 w-100" variant="flat" color="secondary"> generate slips </v-btn>
          </v-col>
          <v-col>
            <v-btn
              class="h-100 w-100"
              variant="flat"
              color="secondary"
              @click="store.openSlipDialog()"
            >
              Manual add
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card rounded="lg" class="h-75">
      <v-skeleton-loader v-if="loader.isLoading" type="table"></v-skeleton-loader>
      <v-data-table
        class="h-100"
        v-else
        title="Payroll Management"
        :items="store.payrollList"
        :headers="store.headers"
        :search="searchText"
        fixedHeader
      >
        <template #top>
          <h2 class="pa-5">
            {{ store.tableTextTitle }}
          </h2>
          <v-divider></v-divider>
        </template>
        <template #[`item.actions`]="{ item }">
          <v-row>
            <v-col cols="6">
              <v-tooltip location="top" text="Information">
                <template #activator="{ props }">
                  <v-icon
                    icon="mdi-information"
                    @click="store.openSlipDialog(item)"
                    v-bind="props"
                  ></v-icon>
                </template>
              </v-tooltip>
            </v-col>
            <v-col cols="6" v-if="item.status !== 'paid'">
              <v-tooltip location="top" text="Pay">
                <template #activator="{ props }">
                  <v-icon icon="mdi-check-circle" color="green" v-bind="props"></v-icon>
                </template>
              </v-tooltip>
            </v-col>
          </v-row>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>
