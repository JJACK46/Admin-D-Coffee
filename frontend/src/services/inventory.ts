import http from './http'
import type { Inventory } from '@/views/Inventory/types/inventory'

export class InventoryService {
  private static path = '/inventory'
  public static async getAll() {
    const res = await http.get(this.path)
    return res.data
  }
  public static async create(item: Inventory) {
    const res = await http.post(this.path, item)
    return res.data
  }
  public static async delete(index: number) {
    const res = await http.delete(`${this.path}/${index}`)
    return res.data
  }

  public static async update(item: Inventory) {
    try {
      const res = await http.patch(`${this.path}/${item.id}`, item)
      return res.status
    } catch (e) {
      throw new Error()
    }
  }
}
