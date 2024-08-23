import { defineStore } from 'pinia'
import { ref } from 'vue'
import { defaultBranch, type Branch } from '../types/branch'
import { BranchService } from '@/services/branch'

export const useBranchStore = defineStore('branch', {
  state() {
    return {
      isDialogOpen: ref(false),
      branchList: ref<Branch[]>([]),
      tempItem: ref<Branch>({ ...defaultBranch }),
      headers: [
        { title: 'ID', key: 'id' },
        { title: 'Name', key: 'name', sortable: false },
        { title: 'Location', key: 'location', sortable: false }
      ]
    }
  },
  getters: {
    getTitleDialog: (state) => {
      if (state.tempItem.id) {
        return 'Edit Branch'
      }
      return 'New Branch'
    }
  },
  actions: {
    async fetchAll() {
      this.branchList = await BranchService.getAll()
    },
    openDialog(item?: Branch) {
      if (item) {
        this.tempItem = item
      }
      this.isDialogOpen = true
    },
    closeDialog() {
      this.isDialogOpen = false
    },
    resetItem() {
      this.tempItem = { ...defaultBranch }
    },
    async deleteItem(id: number) {
      await BranchService.delete(id)
      this.resetItem()
    },
    async save() {
      if (this.tempItem.id) {
        await BranchService.update(this.tempItem)
      } else {
        await BranchService.create(this.tempItem)
      }
      this.closeDialog()
      this.fetchAll()
    }
  }
})
