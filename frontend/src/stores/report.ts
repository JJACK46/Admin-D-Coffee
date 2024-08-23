import { BranchService } from '@/services/branch'
import { ReportService } from '@/services/report'
import type { Branch } from '@/types/branch'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useReportStore = defineStore('report', {
  state() {
    return {
      reports: ref<any[]>(),
      availableBranch: ref<Branch[]>([]),
      selectedBranch: ref(),
      selectedYear: ref(),
      selectedMonth: ref(),
      headers: [
        { title: 'ID', key: 'id' },
        { title: 'Date', key: 'date', sortable: false },
        { title: 'Time', key: 'time', sortable: false },
        { title: 'Total Net', key: 'price', sortable: false },
        { title: 'Payment Type', key: 'type', sortable: false },
        { title: 'Employee', key: 'emp', sortable: false },
        { title: 'Actions', key: 'actions', sortable: false }
      ],
      monthList: [
        { name: 'January', value: 1 },
        { name: 'February', value: 2 },
        { name: 'March', value: 3 },
        { name: 'April', value: 4 },
        { name: 'May', value: 5 },
        { name: 'June', value: 6 },
        { name: 'July', value: 7 },
        { name: 'August', value: 8 },
        { name: 'September', value: 9 },
        { name: 'October', value: 10 },
        { name: 'November', value: 11 },
        { name: 'December', value: 12 }
      ],
      yearList: [2024, 2023]
    }
  },
  actions: {
    async fetchBranch() {
      this.availableBranch = await BranchService.getAll()
    },
    async fetchFull() {
      this.reports = await ReportService.getFull(
        this.selectedBranch,
        this.selectedYear,
        this.selectedMonth
      )
    }
  }
})
