import type { Branch } from '@/views/Branch/types/branch'
import http from './http'

export class BranchService {
  private static path = '/branch'
  public static async getAll() {
    try {
      const res = await http.get(this.path)
      return res.data
    } catch (e) {
      console.log(e)
    }
  }

  public static async getAllShort() {
    try {
      const res = await http.get(`${this.path}/short`)
      return res.data
    } catch (e) {
      console.log(e)
    }
  }

  public static async create(item: Branch) {
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
  public static async update(item: Branch) {
    try {
      const res = await http.patch(`${this.path}/${item.id}`, item)
      return res.data
    } catch (e) {
      console.log(e)
    }
  }

  public static async getOneWithInventory(name: string) {
    try {
      const res = await http.get(`${this.path}/inventory/${name}`)
      return res.data
    } catch (error) {
      throw new Error('' + error)
    }
  }
}
