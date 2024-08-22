import type { StockTaking } from '@/views/Inventory/types/stockTaking'
import http from './http'

export class StockTakingService {
  private static path = '/stock-taking'
  public static async getAll() {
    const res = await http.get(this.path)
    return res.data
  }
  public static async getAllWithFilter(year: number, month: number) {
    try {
      const res = await http.get(`${this.path}/${year}/${month}`)
      return res.data
    } catch (error) {
      throw new Error()
    }
  }
  public static async create(item: StockTaking) {
    const res = await http.post(this.path, item)
    return res.data
  }
  public static async delete(index: number) {
    const res = await http.delete(`${this.path}/${index}`)
    return res.data
  }

  public static async getOne(id: number) {
    try {
      const res = await http.get(`${this.path}/${id}`)
      return res.data
    } catch (error) {
      throw new Error('' + error)
    }
  }
}
