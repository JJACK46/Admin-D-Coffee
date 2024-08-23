import type { Replenishment, ReplenishmentItem } from '@/types/replenishment'
import http from './http'

export class ReplenishmentService {
  private static path = '/replenishment'
  public static async getAll() {
    const res = await http.get(this.path)
    return res.data
  }
  public static async getAllWithFilter(year: number, month: number) {
    try {
      const res = await http.get(`${this.path}/${year}/${month}`)
      return res.data
    } catch (error) {
      console.error(error)
    }
  }
  public static async create(item: Replenishment) {
    try {
      const res = await http.post(this.path, item)
      return res.status
    } catch (error) {
      console.error(error)
    }
  }
  public static async delete(index: number) {
    const res = await http.delete(`${this.path}/${index}`)
    return res.data
  }
  public static async getById(index: number) {
    const res = await http.get(`${this.path}/${index}`)
    return res.data
  }
  public static async update(item: Replenishment) {
    const res = await http.patch(`${this.path}/${item.id}`, item)
    return res.data
  }
  public static async updateAll(items: ReplenishmentItem[]) {
    const res = await http.patch(`${this.path}`, items)
    return res.data
  }
}
