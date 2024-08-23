import { defineStore } from 'pinia'
import { ref } from 'vue'
import { InventoryService } from '@/services/inventory'
import type { Branch } from '@/pages/Branch/types/branch'
import type { Ingredient } from '@/pages/Ingredient/types/ingredient'
import { IngredientService } from '@/services/ingredient'
import { generatePDF } from '@/utils/pdf'
import { BranchService } from '@/services/branch'
import { useAuthStore } from '@/stores/auth'

export const useInventoryStore = defineStore('inventory', {
  state() {
    return {
      availableBranch: ref<Branch[]>([]),
      availableIngredient: ref<Ingredient[]>([]),
      selectedBranch: ref<Branch | null>(null),
      titleDialog: ref(''),
      isDialogOpen: ref(false),
      headers: [
        { title: 'ID', key: 'id' },
        { title: 'Name', key: 'name', sortable: false },
        { title: 'Minimum Balance', key: 'minBalance' },
        { title: 'Balance', key: 'balance' },
        { title: 'Unit', key: 'unit', sortable: false },
        { title: 'Status', key: 'status', sortable: false }
      ],
      currentBranch: useAuthStore().getCurrentUser?.branch
    }
  },
  getters: {
    getInventoryId: (state) => state.selectedBranch?.inventory?.id,
    getInventoryName: (state) => state.selectedBranch?.name,
    getInventoryItems: (state) => state.selectedBranch?.inventory?.inventoryItems,
    getIngredients: (s) => s.availableIngredient
  },
  actions: {
    getDataCSV() {
      const items = this.selectedBranch?.inventory?.inventoryItems
      return items?.map((item) => ({
        ID: item.id,
        Name: item.ingredient?.name,
        MinimumBalance: item.minBalance,
        Balance: item.balance,
        Unit: item.ingredient?.unit,
        Status: this.getTextStatus(item.minBalance, item.balance)
      }))
    },
    isLowStock(minimum: number, balance: number) {
      if (balance >= minimum) {
        return false
      } else {
        return true
      }
    },
    getTextStatus(minimum: number, balance: number) {
      if (balance === 0) {
        return 'OUT'
      }
      if (balance >= minimum) {
        return 'OK'
      } else {
        return 'LOW'
      }
    },
    convertIngIdToUnit(id: number) {
      const ing: Ingredient | undefined = this.availableIngredient.find((item) => item.id === id)
      return ing?.unit
    },
    async fetchAvailableBranch() {
      this.availableBranch = await BranchService.getAll()
    },
    async fetchIngredient() {
      this.availableIngredient = await IngredientService.getAll()
    },
    async handleInventorySelected(value: any) {
      this.selectedBranch = await BranchService.getOneWithInventory(value)
    },
    async reloadInventory() {
      this.selectedBranch = await BranchService.getOneWithInventory(this.selectedBranch?.name!)
    },
    async fetchAll() {
      this.availableBranch = await InventoryService.getAll()
    },
    exportPDF() {
      if (this.isBranchSelected()) {
        const pdfHeaders = ['ID', 'Name', 'Minimum Balance', 'Balance', 'Unit', 'Status']
        const pdfData = this.getInventoryItems!.map((item) => [
          item.id as unknown as string,
          item.ingredient?.name as string,
          item.minBalance as unknown as string,
          item.balance as unknown as string,
          item.ingredient?.unit as string,
          this.getTextStatus(item.minBalance, item.balance)
        ])
        generatePDF(`Inventory : ${this.selectedBranch?.name}`, pdfData, pdfHeaders, 'inventory')
      }
    },
    isBranchSelected(): boolean {
      if (this.selectedBranch) {
        return true
      } else {
        alert('Select branch first !')
        return false
      }
    },
    async fetchSelfInventory() {
      this.selectedBranch = await BranchService.getOneWithInventory(this.currentBranch?.name!)
    },
    hasDuplicateIngredientId(items: any[]) {
      const ingredientIds = new Set<number>()
      for (const item of items) {
        if (item.ingredientId > -1) {
          if (ingredientIds.has(item.ingredientId)) {
            if (ingredientIds.size !== items.length) {
              return true
            }
          } else {
            ingredientIds.add(item.ingredientId)
          }
        }
      }
      return false
    }
  }
})
