import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { useInventoryStore } from './inventory'
import { defaultInventoryItem, type Inventory, type InventoryItem } from '../types/inventory'
import { useAuthStore } from '@/stores/auth'
import type { Ingredient } from '@/types/ingredient'
import type { StockTaking, StockTakingItem } from '../types/stockTaking'
import { StockTakingService } from '@/services/stockTaking'
import { InventoryService } from '@/services/inventory'
import { generatePDF } from '@/utils/pdf'
import { getDateNowString } from '@/utils/date'
import { useNotificationStore } from '@/stores/notifications'

export const useStockTakingStore = defineStore('stock-taking', {
  state() {
    return {
      filterQuery: reactive({ month: 0, year: 0 }),
      notification: useNotificationStore(),
      storeInventory: useInventoryStore(),
      auth: useAuthStore(),
      isDialogOpen: ref(false),
      isConfirmDialogOpen: ref(false),
      editItems: ref<InventoryItem[]>([]),
      savedItems: ref<InventoryItem[]>([]),
      originalItems: ref<InventoryItem[]>([]),
      stockTakingHistory: ref<StockTaking[]>([]),
      dialogHeaders: [
        { title: 'Name', key: 'name', sortable: false },
        { title: 'Minimum Balance', key: 'minBalance' },
        { title: 'Balance', key: 'balance' },
        { title: 'Unit', key: 'unit', sortable: false }
      ]
    }
  },
  getters: {
    getCurrentInventoryTitle: (state) => state.storeInventory.selectedBranch?.name,
    getCurrentEmpFullName: (state) => state.auth.getCurrentUser?.fullName
  },
  actions: {
    async fetchFilterStockTaking() {
      if (this.filterQuery.month > 0 && this.filterQuery.year > 0) {
        this.stockTakingHistory = await StockTakingService.getAllWithFilter(
          this.filterQuery.year,
          this.filterQuery.month
        )
      } else {
        alert('Please select month and year valid !')
      }
    },
    convertIngIdToUnit(id: number) {
      const ing: Ingredient | undefined = this.storeInventory.availableIngredient.find(
        (item) => item.id === id
      )
      return ing?.unit
    },
    async fetchStockTakingHistory() {
      this.stockTakingHistory = await StockTakingService.getAll()
    },
    async copyInventoryItems() {
      this.editItems = JSON.parse(JSON.stringify(this.storeInventory.getInventoryItems))
      this.originalItems = this.storeInventory.getInventoryItems!
    },
    openDialog() {
      if (this.storeInventory.isBranchSelected()) {
        this.copyInventoryItems()
        this.isDialogOpen = true
      }
    },
    openConfirmDialog() {
      if (this.editItems.length > 0) {
        this.isConfirmDialogOpen = true
      } else {
        alert('Empty items ! Select branch first')
      }
    },
    closeConfirmDialog() {
      this.isConfirmDialogOpen = false
    },
    closeDialog() {
      this.editItems = []
      this.isDialogOpen = false
    },
    addItem() {
      this.editItems.push({
        ...defaultInventoryItem
      })
    },
    removeItem(index: number) {
      if (this.editItems[index].ingredient) {
        this.editItems[index].balance = 0
      } else {
        this.editItems.splice(index, 1)
      }
    },
    async save() {
      this.editItems.forEach((item) => {
        item.ingredientId = item.ingredient?.id!
      })
      const inventory: Inventory = {
        id: this.storeInventory.getInventoryId,
        inventoryItems: this.editItems
      }
      try {
        const status = await InventoryService.update(inventory)

        //record
        if (status === 200) {
          const stockTaking: StockTaking = {
            employeeId: this.auth.getCurrentUser?.employeeId!,
            inventoryId: inventory.id!,
            createdDate: getDateNowString(),
            stockTakingItems: inventory.inventoryItems.map((item, index) => {
              return <StockTakingItem>{
                inventoryItemId: item.id,
                balanceOld: this.originalItems[index]?.balance ?? 0,
                balanceUpdate: item.balance
              }
            })
          }
          await StockTakingService.create(stockTaking)
        }
        this.notification.addPopText('Stock-taking success', 'success')
      } catch (error) {
        this.notification.addPopText('Stock-taking failed', 'error')
      }

      this.storeInventory.reloadInventory()
      this.isConfirmDialogOpen = false
      this.isDialogOpen = false
    },
    exportPDF() {
      const headers = ['ID', 'Inventory', 'Employee', 'Date', 'Time']
      const data = this.stockTakingHistory.map((item) => [
        item.id as unknown as string,
        item.inventoryName ?? '',
        item.employeeName!,
        item.createdDate ?? '',
        item.createdTime ?? ''
      ])
      generatePDF('Stock-taking History', data, headers, 'stock-taking-history')
    },
    getDataCSV() {
      const items = this.stockTakingHistory
      return items.map((item) => ({
        ID: item.id,
        Inventory: item.inventoryName,
        Employee: item.employeeName,
        CreatedDate: item.createdDate,
        CreatedTime: item.createdTime
      }))
    }
  }
})
