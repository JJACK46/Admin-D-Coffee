<template>
  <StockTakingDialog />
  <ReplenishmentDialog />
  <v-container fluid>
    <v-card rounded="xl">
      <template #title>
        <v-select
          v-if="auth.isAdmin()"
          hide-details
          rounded="lg"
          class="mt-2"
          variant="outlined"
          label="Branch"
          :rules="[requiredRule]"
          :items="store.availableBranch"
          item-title="name"
          item-value="name"
          @update:model-value="store.handleInventorySelected"
          placeholder="Select branch"
        >
        </v-select>
        <div v-else class="px-5 pt-2">
          <v-skeleton-loader v-if="loader.isLoading" type="text"></v-skeleton-loader>
          <h2 v-else>
            {{ `Inventory: ${store.selectedBranch?.name ?? 'No data'}` }}
          </h2>
        </div>
        <v-divider class="mt-3"></v-divider>
      </template>
      <template #actions>
        <span class="d-flex justify-end w-100 px-3 pb-3">
          <v-menu>
            <template #activator="{ props }">
              <v-btn prepend-icon="mdi-clock" v-bind="props">History</v-btn>
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
              <v-btn prepend-icon="mdi-open-in-app" v-bind="props">Quick Actions </v-btn>
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
      </template>
    </v-card>
    <v-card rounded="lg" class="my-5" height="420">
      <InventoryTable />
    </v-card>
    <v-card rounded="lg" class="py-3 border bg-transparent">
      <h5 class="d-flex justify-center align-center">
        <v-icon icon="mdi-alert" class="mr-1 ml-1"> </v-icon>
        Be cautious to take any action !
      </h5>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import InventoryTable from '../components/InventoryTable.vue'
import { useInventoryStore } from '../store/inventory'
import { onMounted } from 'vue'
import StockTakingDialog from '../components/StockTakingDialog.vue'
import ReplenishmentDialog from '../components/ReplenishmentDialog.vue'
import { useStockTakingStore } from '../store/stockTaking'
import { requiredRule } from '@/utils/rules'
import { useReplenishmentStore } from '../store/replenishment'
import { useAuthStore } from '@/stores/auth'
import ExportFileButton from '@/components/ExportFileButton.vue'
import { useLoadingStore } from '@/stores/loading'
const store = useInventoryStore()
const storeStock = useStockTakingStore()
const storeRep = useReplenishmentStore()
const auth = useAuthStore()
const loader = useLoadingStore()

onMounted(() => {
  if (auth.isAdmin()) {
    store.fetchAll()
  } else {
    store.fetchSelfInventory()
  }
})
</script>
