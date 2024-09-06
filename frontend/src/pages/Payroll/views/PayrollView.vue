<script setup lang="ts">
import { usePayrollStore } from '@/stores/payroll'
import SlipView from '../components/SlipView.vue'
import SearchTableField from '@/components/SearchTableField.vue'
import { ref } from 'vue'
import { useLocale } from 'vuetify'
import MainTable from '@/components/MainTable.vue'

const store = usePayrollStore()
const searchText = ref()
const { t } = useLocale()
function handleSearchText(value: string) {
  searchText.value = value
}
</script>
<template>
  <SlipView />
  <MainTable
    :title="`${t('Payroll Management')}`"
    :items="store.payrollList"
    :headers="store.headers"
    :search="searchText"
    hasAction
  >
    <template #topCardText>
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
    </template>
    <template #actions="{ item }">
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
  </MainTable>
</template>
