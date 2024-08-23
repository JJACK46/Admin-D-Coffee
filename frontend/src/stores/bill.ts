import { ref } from 'vue'
import { defineStore } from 'pinia'
import { BillService } from '@/services/bill'
import { type Bill, defaultBill } from '@/types/Bill'

export const useBillStore = defineStore('bill', {
  state() {
    return {
      bills: ref<Bill[]>([]),
      billsPaid: ref<Bill[]>([]),
      billsPending: ref<Bill[]>([]),
      headers: [
        { title: 'ID', key: 'id' },
        { title: 'Category', key: 'category', sortable: false },
        { title: 'Date', key: 'date', sortable: false },
        { title: 'Worth', key: 'worth', sortable: false },
        { title: 'Status', key: 'status', sortable: false }
      ],
      headersLines: [
        { title: 'Name', key: 'name', sortable: false },
        { title: 'Price', key: 'price', sortable: false },
        { title: 'Action', key: 'action', sortable: false }
      ],
      tempBill: ref<Bill>({ ...defaultBill }),
      isDialogOpen: ref(false)
    }
  },
  getters: {
    getBills: (s) => s.bills,
    getTempBill: (s) => s.tempBill
  },
  actions: {
    openDialog() {
      this.isDialogOpen = true
    },
    closeDialog() {
      this.tempBill = { ...defaultBill }
      this.isDialogOpen = false
    },
    async save() {
      await BillService.create(this.tempBill)
      this.fetchBills()
      this.closeDialog()
    },
    async fetchBills() {
      this.bills = await BillService.getAll()
    },
    addLine() {
      this.tempBill.lines.push({
        name: '',
        price: 0
      })
    },
    removeLine(index: number) {
      this.tempBill.lines.splice(index, 1)
    }
  }
})
