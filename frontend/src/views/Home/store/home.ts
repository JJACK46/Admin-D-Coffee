import { BranchService } from '@/services/branch'
import { ReportService } from '@/services/report'
import { type Branch } from '@/views/Branch/types/branch'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { defaultRevenueDTO, type Revenue, type RevenueDTO } from '../types/revenue'

interface SalesData {
  dailySales: {
    yesterday: number | null
    today: number | null
  }
  monthlySales: {
    lastMonth: number | null
    thisMonth: number | null
  }
  yearlySales: {
    lastYear: number | null
    thisYear: number | null
  }
}

export const useHomeStore = defineStore('dashboard', {
  state() {
    return {
      selectBranch: ref<Branch>(),
      salesData: ref<SalesData>(),
      availableBranch: ref<Branch[]>([]),
      revenueData: ref<Revenue>(),
      revenueDTO: ref<RevenueDTO>(defaultRevenueDTO)
    }
  },
  getters: {
    getDailySales: (state) => state.salesData?.dailySales,
    getMonthlySales: (state) => state.salesData?.monthlySales,
    getYearlySales: (state) => state.salesData?.yearlySales,
    getBranch: (s) => s.availableBranch,
    getRevenueDay: (s) => s.revenueData?.day ?? [],
    getRevenueMonth: (s) => s.revenueData?.month ?? [],
    getRevenueYear: (s) => s.revenueData?.year ?? []
  },
  actions: {
    setupToday() {
      this.revenueDTO = {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1
      }
      this.fetchRevenue()
    },
    async fetchSales() {
      this.salesData = await ReportService.getSales()
    },
    async fetchBranch() {
      this.availableBranch = await BranchService.getAllShort()
    },
    async fetchSalesByBranchId() {
      if (this.selectBranch) {
        this.salesData = await ReportService.getSalesByBranchId(this.selectBranch?.id!)
      }
    },
    async fetchRevenue() {
      if (this.selectBranch) {
        this.revenueDTO.branchId = this.selectBranch.id
      }
      this.revenueData = await ReportService.getRevenue(this.revenueDTO)
    }
  }
})
