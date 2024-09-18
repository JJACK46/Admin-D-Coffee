<script setup lang="ts">
import { useLoadingStore } from '@/stores/loading'
import { useReportStore } from '../../../stores/report'
import { onMounted } from 'vue'
import { useLocale } from 'vuetify'
const { t } = useLocale()
const loader = useLoadingStore()
const store = useReportStore()

onMounted(() => {
  store.fetchBranch()
})
</script>

<template>
  <v-container fluid class="h-100">
    <v-card class="pa-5 h-100" :title="`${t('Report')}`">
      <v-card-text>
        <v-row>
          <v-col cols="3">
            <v-select
              density="compact"
              variant="outlined"
              :items="store.availableBranch"
              :item-title="'name'"
              :item-value="'id'"
              v-model="store.selectedBranch"
              label="Branch"
            ></v-select>
          </v-col>
          <v-col cols="3">
            <v-select
              density="compact"
              variant="outlined"
              :items="store.yearList"
              v-model="store.selectedYear"
              label="Year"
            ></v-select>
          </v-col>
          <v-col cols="3">
            <v-select
              density="compact"
              variant="outlined"
              :items="store.monthList"
              :item-value="'value'"
              :item-title="'name'"
              v-model="store.selectedMonth"
              label="Month"
            ></v-select>
          </v-col>
          <v-col cols="3">
            <v-btn flat class="w-100" @click="store.fetchFull()">reload</v-btn>
          </v-col>
          <v-data-table
            :loading="loader.isLoading"
            :items="store.reports"
            :headers="store.headers"
            fixed-header
          >
            <template #item="{ item }">
              <tr>
                <td>
                  {{ item.id }}
                </td>
                <td>
                  {{ item.createdDate }}
                </td>
                <td>
                  {{ item.createdTime }}
                </td>
                <td>
                  {{ item.totalNet }}
                </td>
                <td>
                  {{ item.paymentType }}
                </td>
                <td>
                  {{ `${item.user.employee.firstName} ${item.user.employee.lastName} ` }}
                </td>
                <td><v-icon class="d-flex" icon="mdi-information"></v-icon></td>
              </tr>
            </template>
          </v-data-table>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
