import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import {
  defaultReplenishmentItem,
  type Replenishment,
  type ReplenishmentItem
} from '../types/replenishment'
import { ReplenishmentService } from '@/services/replenishment'
import { getDateNowString } from '@/utils/date'
import { useAuthStore } from '@/stores/auth'
import { useInventoryStore } from './inventory'
import { generatePDF } from '@/utils/pdf'
import { useNotificationStore } from '@/stores/notifications'

export const useReplenishmentStore = defineStore('replenishment', {
  state() {
    return {
      filterQuery: reactive({ month: 0, year: 0 }),
      notification: useNotificationStore(),
      auth: useAuthStore(),
      inv: useInventoryStore(),
      isDialogOpen: ref(false),
      repItems: ref<ReplenishmentItem[]>([]),
      replenishmentHistory: ref<Replenishment[]>([]),
      headers: [
        { title: 'ID', sortable: true },
        { title: 'Ingredient', sortable: false },
        { title: 'Balance', sortable: true },
        { title: 'Unit', sortable: false },
        { title: 'Cost', sortable: true }
      ]
    }
  },
  getters: {
    getCurrentInventoryTitle: (s) => s.inv.selectedBranch?.name,
    getTotalCost: (state) => state.repItems.reduce((sum, item) => item.cost + sum, 0)
  },
  actions: {
    async fetchFilterReplenishment() {
      if (this.filterQuery.month > 0 && this.filterQuery.year > 0) {
        this.replenishmentHistory = await ReplenishmentService.getAllWithFilter(
          this.filterQuery.year,
          this.filterQuery.month
        )
      } else {
        alert('Please select month and year valid !')
      }
    },
    openDialog() {
      if (this.inv.isBranchSelected()) {
        this.isDialogOpen = true
      }
    },
    closeDialog() {
      this.repItems = []
      this.isDialogOpen = false
    },
    async save() {
      const status = await ReplenishmentService.create(<Replenishment>{
        createdDate: getDateNowString(),
        employeeId: this.auth.getCurrentUser?.employeeId,
        inventoryId: this.inv.getInventoryId,
        totalCost: this.getTotalCost,
        replenishmentItems: this.repItems
      })
      if (status === 201) {
        this.notification.addPopText('Replenishment success', 'success')
      } else {
        this.notification.addPopText('Replenishment failed', 'error')
      }
      this.repItems = []
      this.closeDialog()
    },
    removeItem(index: number) {
      this.repItems.splice(index, 1)
    },
    addItem() {
      this.repItems.push({ ...defaultReplenishmentItem })
    },
    async fetchHistory() {
      this.replenishmentHistory = await ReplenishmentService.getAll()
    },
    exportPDF() {
      const headers = ['ID', 'Inventory', 'Total Cost', 'Employee', 'Date']
      const data = this.replenishmentHistory.map((item) => [
        item.id as unknown as string,
        item.inventoryName ?? '',
        item.totalCost as unknown as string,
        item.employeeFullName ?? '',
        item.createdDate ?? ''
      ])
      generatePDF('Replenishment History', data, headers, 'replenishment-history')
    },
    getDataCSV() {
      const items = this.replenishmentHistory
      return items.map((item) => ({
        ID: item.id,
        Inventory: item.inventoryName,
        TotalCost: item.totalCost,
        Employee: item.employeeFullName,
        CreatedDate: item.createdDate,
        CreatedTime: item.createdTime
      }))
    }
  }
})
