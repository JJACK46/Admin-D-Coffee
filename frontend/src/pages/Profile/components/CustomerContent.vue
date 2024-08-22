<template>
  <v-container fluid class="h-100">
    <CardProfile :image-url="`${baseURLImage}/customers/${user?.imageUrl}`">
      <template #content>
        <v-list-item
          :title="user?.fullName"
          :subtitle="`@${user?.username}`"
          class="justify-center d-flex"
        >
          <v-chip class="mt-3" density="compact" color="orange">PREMIUM</v-chip>
          <v-divider class="my-2"></v-divider>
          <p>{{ `Membership Date : ${profile.customer?.createdDate}` }}</p>
          <p>{{ `D-Points : ${profile.customer?.point}` }}</p>
        </v-list-item>
      </template>
    </CardProfile>
    <v-row>
      <v-col>
        <v-skeleton-loader v-if="loader.isLoading" type="table"></v-skeleton-loader>
        <v-card v-else rounded="lg">
          <TableLayout
            title="Order History"
            show-expand
            :items="profile.receipts"
            :headers="headers"
            :search="searchText"
          >
            <template #topCardText>
              <v-row>
                <v-col>
                  <SearchTableField @get-search-text="(v) => (searchText = v)" />
                </v-col>
              </v-row>
            </template>
            <template #expanded-row="{ item }">
              <v-data-table class="border" :items="item.receiptItemsShort">
                <template #bottom></template>
              </v-data-table>
              <div class="justify-center mt-3">
                <PreviewReceipt />
                <v-row class="d-flex justify-center text-center">
                  <v-col cols="auto">
                    <v-btn
                      @click="receipt.openDialog(item)"
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
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { baseURLImage } from '@/services/http'
import { useAuthStore } from '@/stores/auth'
import { useProfileStore } from '../stores/profile'
import { useLoadingStore } from '@/stores/loading'
import TableLayout from '@/layouts/TableLayout.vue'
import SearchTableField from '@/components/SearchTableField.vue'
import { ref } from 'vue'
import { useReceiptStore } from '@/views/Receipt/stores/receipt'
import PreviewReceipt from '@/views/Receipt/components/PreviewReceipt.vue'
import CardProfile from './CardProfile.vue'

const auth = useAuthStore()
const receipt = useReceiptStore()
const user = auth.getCurrentUser()
const profile = useProfileStore()
const loader = useLoadingStore()
const searchText = ref()

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Date', key: 'createdDate', sortable: false },
  { title: 'Time', key: 'createdTime', sortable: false },
  { title: 'Total Net', key: 'totalNet', sortable: false },
  { title: 'Payment Type', key: 'paymentType', sortable: false },
  { title: 'Employee', key: 'employeeName', sortable: false },
  { title: 'Customer', key: 'customer.fullName', sortable: false },
  { title: 'Promotion', key: 'promotion.name', sortable: false },
  { title: 'Branch', key: 'branchName', sortable: false }
]
</script>
