import type { Promotion } from '@/types/Promotion'
import http from './http'

export class PromotionService {
  private static path = '/promotions'
  public static async getAll() {
    try {
      const res = await http.get(this.path)
      return res.data
    } catch (e) {
      console.log(e)
    }
  }

  public static async create(item: Promotion) {
    try {
      const res = await http.post(this.path, item)
      return res.data
    } catch (e) {
      console.log(e)
    }
  }
  public static async delete(index: number) {
    try {
      const res = await http.delete(`${this.path}/${index}`)
      return res.data
    } catch (e) {
      console.log(e)
    }
  }
  public static async getById(index: number) {
    try {
      const res = await http.get(`${this.path}/${index}`)
      return res.data
    } catch (e) {
      console.log(e)
    }
  }
  public static async update(item: Promotion) {
    try {
      const res = await http.patch(`${this.path}/${item.id}`, item)
      return res.data
    } catch (e) {
      console.log(e)
    }
  }
}
