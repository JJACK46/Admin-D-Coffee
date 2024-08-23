<script setup lang="ts">
import { useLoadingStore } from '@/stores/loading'
import { useReportStore } from '../../../stores/report'
import { onMounted } from 'vue'

const loader = useLoadingStore()
const store = useReportStore()

onMounted(() => {
  store.fetchBranch()
})
</script>

<template>
  <v-container fluid class="h-100">
    <v-card rounded="xl" class="pa-5 h-100" title="Sales Report">
      <v-card-text>
        <v-row>
          <v-col cols="4">
            <v-select
              :items="store.availableBranch"
              :item-title="'name'"
              :item-value="'id'"
              v-model="store.selectedBranch"
              label="Branch"
            ></v-select>
          </v-col>
          <v-col cols="4">
            <v-select :items="store.yearList" v-model="store.selectedYear" label="Year"></v-select>
          </v-col>
          <v-col cols="4">
            <v-select
              :items="store.monthList"
              :item-value="'value'"
              :item-title="'name'"
              v-model="store.selectedMonth"
              label="Month"
            ></v-select>
          </v-col>
          <v-col class="justify-center d-flex pa-0">
            <v-btn variant="tonal" rounded="lg" @click="store.fetchFull()"> display</v-btn>
          </v-col>
          <v-col cols="12 h-100">
            <v-divider class="mt-5"></v-divider>
            <v-skeleton-loader v-if="loader.isLoading" type="table"></v-skeleton-loader>
            <v-data-table v-else :items="store.reports" :headers="store.headers" fixed-header>
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
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
