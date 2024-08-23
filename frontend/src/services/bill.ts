import http from './http'
import type { Bill } from '@/pages/Bill/types/Bill'

export class BillService {
  private static path = '/bills'
  public static async getAll() {
    try {
      const res = await http.get(this.path)
      return res.data
    } catch (e) {
      console.log(e)
    }
  }

  public static async create(bill: Bill) {
    try {
      const res = await http.post(this.path, bill)
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
  public static async update(bill: Bill) {
    try {
      const res = await http.patch(`${this.path}/${bill.id}`)
      return res.data
    } catch (e) {
      console.log(e)
    }
  }
}
