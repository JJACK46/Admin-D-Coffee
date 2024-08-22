import type { Ingredient } from '@/views/Ingredient/types/ingredient'
import http from './http'

export class IngredientService {
  private static path = '/ingredients'
  public static async getAll() {
    try {
      const res = await http.get(this.path)
      return res.data
    } catch (e) {
      throw new Error('' + e)
    }
  }
  public static async create(item: Ingredient) {
    const res = await http.post(this.path, item)
    return res.data
  }
  public static async delete(index: number) {
    const res = await http.delete(`${this.path}/${index}`)
    return res.data
  }
  public static async getById(index: number) {
    const res = await http.get(`${this.path}/${index}`)
    return res.data
  }
  public static async update(item: Ingredient) {
    const res = await http.patch(`${this.path}/${item.id}`, item)
    return res.data
  }
}
