import type { RevenueDTO } from '@/types/revenue'
import http from './http'

export class ReportService {
  private static path = 'reports'
  public static async getFull(branch: number, year: number, month: number) {
    try {
      const res = await http.get(`${this.path}/${branch}/${year}/${month}`)
      return res.data
    } catch (error) {
      throw new Error('' + error)
    }
  }

  public static async getSales() {
    try {
      const res = await http.get(`${this.path}/sales`)
      return res.data
    } catch (error) {
      throw new Error()
    }
  }

  public static async getSalesByBranchId(id: number) {
    try {
      const res = await http.get(`${this.path}/sales/${id}`)
      return res.data
    } catch (error) {
      throw new Error()
    }
  }
  public static async getRevenue(data: RevenueDTO) {
    try {
      const res = await http.post(`${this.path}/revenue`, data)
      return res.data
    } catch (error) {
      throw new Error()
    }
  }
}
