<template>
  <StockTakingDialog />
  <ReplenishmentDialog />
  <MainTable
    title="Inventory Management"
    :headers="store.headers"
    :items="store.getInventoryItems ?? []"
    has-custom-items
  >
    <template #topCardText>
      <v-row class="align-center">
        <v-col>
          <v-select
            v-if="isAdmin"
            hide-details
            class="mt-2"
            variant="outlined"
            density="compact"
            label="Branch"
            :rules="[requiredRule]"
            :items="store.availableBranch"
            item-title="name"
            item-value="name"
            @update:model-value="store.handleInventorySelected"
          >
          </v-select>
        </v-col>
        <v-col cols="auto">
          <span class="d-flex w-100 h-100 ga-2">
            <v-menu>
              <template #activator="{ props }">
                <v-btn prepend-icon="mdi-clock" v-bind="props" variant="flat">History</v-btn>
              </template>
              <v-list style="cursor: pointer">
                <v-list-item title="Stock-taking" to="/stock-taking-history" target="_blank">
                </v-list-item>
                <v-list-item
                  title="Replenishment"
                  class="listItemHover"
                  to="/replenishment-history"
                  target="_blank"
                >
                </v-list-item>
              </v-list>
            </v-menu>
            <v-menu>
              <template #activator="{ props }">
                <v-btn prepend-icon="mdi-open-in-app" v-bind="props" variant="flat"
                  >Quick Actions
                </v-btn>
              </template>
              <v-list style="cursor: pointer">
                <v-list-item @click="storeStock.openDialog()" class="listItemHover"
                  >Stock-taking</v-list-item
                >
                <v-list-item class="listItemHover" @click="storeRep.openDialog()"
                  >Replenishment</v-list-item
                >
              </v-list>
            </v-menu>
            <div>
              <ExportFileButton
                :callback-pdf="store.exportPDF"
                filenameCSV="inventory"
                :data-c-s-v="store.getDataCSV()"
              ></ExportFileButton>
            </div>
          </span>
        </v-col>
      </v-row>
    </template>
    <template #item="{ item }">
      <tr :class="handleHighlight(item.minBalance, item.balance)">
        <td>{{ item.id }}</td>
        <td>{{ item.ingredient?.name }}</td>
        <td>{{ item.minBalance }}</td>
        <td>{{ item.balance }}</td>
        <td>{{ item.ingredient?.unit }}</td>
        <td>{{ store.getTextStatus(item.minBalance, item.balance) }}</td>
      </tr>
    </template>
  </MainTable>
</template>

<script setup lang="ts">
import MainTable from '@/components/MainTable.vue'
import { useInventoryStore } from '../../../stores/inventory'
import { onMounted, ref } from 'vue'
import StockTakingDialog from '../components/StockTakingDialog.vue'
import ReplenishmentDialog from '../components/ReplenishmentDialog.vue'
import { useStockTakingStore } from '../../../stores/stockTaking'
import { requiredRule } from '@/utils/rules'
import { useReplenishmentStore } from '../../../stores/replenishment'
import { useAuthStore } from '@/stores/auth'
import ExportFileButton from '@/components/ExportFileButton.vue'
import { Role } from '@/router/enum'
const store = useInventoryStore()
const storeStock = useStockTakingStore()
const storeRep = useReplenishmentStore()
const auth = useAuthStore()
const isAdmin = ref()

onMounted(async () => {
  isAdmin.value = await auth.isAuthorized([Role.admin])
  if (isAdmin.value) {
    store.fetchAll()
  } else {
    store.fetchSelfInventory()
  }
})

function handleHighlight(min: number, balance: number) {
  if (balance === 0) {
    return 'text-red'
  }
  if (store.isLowStock(min, balance)) {
    return 'text-orange'
  } else {
    return ''
  }
}
</script>
